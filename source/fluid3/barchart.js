import { Component } from './component.js';
import { Bar } from './bar.js';
var d3 = require('d3');

class Bar extends Component {
	constructor(d3Selection) {
		super(d3Selection.append('g').attr('class', 'bar'));
		this.attr({
			value: 0,
			scale: d3.scaleLinear(),
			domain: [0, 100],
			towards: 'top',
			rect: {}
		});
	}
	update(duration, delay) {
		var selection = this.getOrCreateNth('rect');
		if(duration) selection = selection.transition().duration(duration).delay(delay || 0);

		this.updateAttributes(['width', 'height', 'scale', 'domain', 'value', 'towards'], (width, height, scale, domain, value, towards) => {
			var attr = this._attr,
				reshape = (x, y, width, height) => {
					selection = selection.attr('x', x)
						.attr('y', y)
						.attr('width', width)
						.attr('height', height);
				};
			switch(this._attr.towards) {
				case 'top': {
					let extension = scale.domain(domain).range([0, attr.height])(attr.value);
					reshape(0, attr.height - extension, attr.width, extension);
				} break;
				case 'right': {
					let extension = scale.domain(domain).range([0, attr.width])(attr.value);
					reshape(0, 0, extension, attr.height);
				} break;
				case 'bottom': {
					let extension = scale.domain(domain).range([0, attr.height])(attr.value);
					reshape(0, 0, attr.width, extension);
				} break;
				case 'left': {
					let extension = scale.domain(domain).range([0, attr.width])(attr.value);
					reshape(attr.width - extension, 0, extension, attr.height);
				} break;
			}
		});

		this.updateAttributes(['rect'], (rectAttr) => {
			for(let key in rectAttr) {
				selection = selection.attr(key, rectAttr[key]);
			}
		});

		return super.update(duration, delay);
	}
}

export { Bar };