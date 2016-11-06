import { Component } from './component.js';
import { Path } from './shape.js';
import { animate } from './util.js';

let d3 = require('d3');

class Trend extends Component {
	constructor(d3Selection) {
		let selection = d3Selection.append('g').attr('class', 'trend');
		super(selection);
		this.attr({
			x: 0,
			y: 0,
			width: 100,
			height: 100,
			values: [],
			scale: d3.scaleLinear(),
			domain: [0, 100],
			towards: 'top',
			line: d3.line(),
			pathAttr: {}
		});
		this.path = selection.append('path');
	}

	update(duration, delay, ease) {
		let group = this.selection(),
			attr = this.attr(),
			toUpdate = this.toUpdate(),
			values = attr.values,
			towards = attr.towards,
			pathAttr = toUpdate.pathAttr || {},
			x = attr.x,
			y = attr.y,
			width = attr.width,
			height = attr.height,
			isVertical = towards === 'top' || towards === 'bottom',
			path = this.path,
			line = attr.line,
			domain = attr.domain,
			range = [0, isVertical ? height : width],
			scale = attr.scale.domain(domain).range(range),
			dimensionRange = [0, isVertical ? width : height],
			dimensionScale = d3.scaleLinear().range(dimensionRange);

		switch(towards) {
			case 'top':
				line = line
					.x((d, i, a) => dimensionScale.domain([0, a.length - 1])(i))
					.y((d) => height - scale(d))
			break;
			case 'bottom':
				line = line
					.x((d, i, a) => dimensionScale.domain([0, a.length - 1])(i))
					.y((d) => scale(d))
			break;
			case 'left':
				line = line
					.x((d) => width - scale(d))
					.y((d, i, a) => dimensionScale.domain([0, a.length - 1])(i))
			break;
			case 'right':
				line = line
					.x((d) => scale(d))
					.y((d, i, a) => dimensionScale.domain([0, a.length - 1])(i))
			break;
			default:
				throw '"' + towards + '" is not a valid direction (top, bottom, left, right)';
		}
		group = animate(group, duration, delay, ease);

		group.attr('transform', (d, i, a) => {
			var xPos = typeof x === 'function' ? x(d, i, a) : x,
				yPos = typeof y === 'function' ? y(d, i, a) : y;
				
			return 'translate(' + xPos + ', ' + yPos + ')';
		});

		path = 'values' in toUpdate ? path.datum(values) : path;
		path = animate(path, duration, delay, ease);
		path.attr('d', line);

		Object.keys(pathAttr || []).forEach((key) => {
			path = path.attr(key, pathAttr[key]);
		});

		return super.update(duration, delay, ease);
	}
}

export { Trend };
