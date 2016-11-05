import { Component } from './component.js';
import { Rect } from './shape.js';
import { animate } from './util.js';

let d3 = require('d3');

function toArgList(list) {
	if (list.length === 0) {
		return '';
	} else if (list.length === 1) {
		return list[0];
	} else {
		return (list[0] ? list[0] + ', ' : '') + toArgList(list.slice(1));
	}
}

class Bar extends Component {
	constructor(d3Selection) {
		super(d3Selection.append('g').attr('class', 'bar'));
		this.attr({
			x: 0,
			y: 0,
			width: 100,
			height: 100,
			value: 0,
			scale: d3.scaleLinear(),
			domain: [0, 100],
			towards: 'top',
			shape: Rect,
			shapeAttrs: {},
			textFormat: (s) => { return s; }
		});
		this.shape = undefined;
	}
	update(duration, delay, ease) {
		let group = this.selection(),
			attr = this.attr(),
			toUpdate = this.toUpdate(),
			domain = attr.domain,
			scale = attr.scale,
			value = attr.value,
			x = attr.x,
			y = attr.y,
			isVertical = this._attr.towards === 'top' || this._attr.towards === 'bottom',
			range = [0, isVertical ? attr.height : attr.width],
			length = typeof value === 'function'
				? (d, i, a) => scale.domain(domain).range(range)(value(d, i, a))
				: () => scale.domain(domain).range(range)(value);

		// debugger;
		if(!this.shape) {
			this.shape = new attr.shape(group);
		}

		group = animate(group, duration, delay, ease);

		group.attr('transform', (d, i, a) => {
			var xPos = typeof x === 'function' ? x(d, i, a) : x,
				yPos = typeof y === 'function' ? y(d, i, a) : y;
				
			return 'translate(' + xPos + ', ' + yPos + ')';
		});

		if('shapeAttrs' in toUpdate && Object.keys(toUpdate.shapeAttrs).length) {
			this.shape = this.shape.attr(toUpdate.shapeAttrs);
		}

		switch(this._attr.towards) {
			case 'top': {
				this.shape.attr({
					x: 0, 
					y: (d, i, a) => attr.height - length(d, i, a),
					width: attr.width,
					height: (d, i, a) => length(d, i, a)
				});
			} break;
			case 'right': {
				this.shape.attr({
					x: 0,
					y: 0,
					width: (d, i, a) => length(d, i, a),
					height: attr.height
				});
			} break;
			case 'bottom': {
				this.shape.attr({
					x: 0,
					y: 0,
					width: attr.width,
					height: (d, i, a) => length(d, i, a)
				});
			} break;
			case 'left': {
				this.shape.attr({
					x: (d, i, a) => attr.width - length(d, i, a),
					y: 0,
					width: (d, i, a) => length(d, i, a),
					height: attr.height
				});
			} break;
		}
		this.shape.update(duration, delay, ease);

		return super.update(duration, delay, ease);
	}
}

export { Bar };
