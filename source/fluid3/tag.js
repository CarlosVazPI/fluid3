import { Component } from './component.js';
import { animate } from './util.js';

let d3 = require('d3');

function Tag(tag) {
	return class extends Component {
		constructor(d3Selection) {
			super(d3Selection.append('g').attr('class', 'tag ' + tag));
		}
		update(duration, delay) {
			let object = this.getOrCreateNth(tag);

			object = animate(object, duration, delay);

			for (var key in this.toUpdate()) {
				if (key !== 'x' && key !== 'y') {
					object = object.attr(key, this.attr(key));
				}
			}

			return super.update(duration, delay);
		}
	}
}

var Rect = Tag('rect'),
	Circle = Tag('circle'),
	Ellipse = Tag('ellipse'),
	Path = Tag('path');

export { Tag, Rect, Circle, Ellipse, Path };
