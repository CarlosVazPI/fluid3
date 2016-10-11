import { Component } from './component.js';

let d3 = require('d3');

function SVGElement(svgTagName) {
	return class extends Component {
		constructor(d3Selection) {
			super(d3Selection.append('g').attr('class', 'svgElement'));
			this._svgTagName = svgTagName;
		}

		update(duration, delay = 0) {
			let selection = this.getOrCreateNth(this._svgTagName);

			if (duration) {
				selection = selection.transition().duration(duration).delay(delay);
			}

			for (let key in this._toUpdate) {
				selection = selection.attr(key, this._attr[key]);
			}

			return super.update(duration, delay);
		}
	}
}

export { SVGElement };
