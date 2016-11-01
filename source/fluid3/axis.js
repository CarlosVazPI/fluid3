let d3 = require('d3');

function Axis(axis) {
	return class {
		constructor(d3Selection) {
			this._attr = {
				x: 0,
				y: 0,
				range: [0, 100],
				scale: d3.scaleLinear(),
				domain: [0, 100]
			};
			this._selection = d3Selection.append('g').attr('class', 'axis');
		}

		update(duration, delay) {
			let attr = this._attr,
				scale = attr.scale.domain(attr.domain).range(attr.range),
				selection = duration ? this._selection.transition().duration(duration).delay(delay || 0) : this._selection;

			selection.call(axis.scale(scale));
			return this;
		}
	}
}