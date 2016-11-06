import { Component } from './component.js';
import { animate } from './util.js';

let d3 = require('d3');

/**
 * Returns a class extending Component to draw a basic SVG shape (rect, circle, ellipse, path).
 *
 * @param	tag 	SVG shape on which the returned class should be based on
 * 
 * @return 			Class extending Component to draw a basic SVG shape
 */
function Tag(tag) {
	return class extends Component {

		/**
		 * Creates an SVG element (tag).
		 */
		constructor(d3Selection) {
			super(d3Selection.append(tag));
		}

		/**
		 * Assigns the attributes (set with `attr`) to the SVGelement.
		 * Chainable method.
		 *
		 * @return 	this
		 */
		update(duration, delay, ease) {
			let object = this.selection(),
				toUpdate = this.toUpdate();

			object = animate(object, duration, delay, ease);
			for (var key in toUpdate) {
				object = object.attr(key, this.attr(key));
			}

			return super.update(duration, delay, ease);
		}
	}
}

function roundedRectangle (x, y, w, h, r1, r2, r3, r4) {
  	return 'M' + x + ',' + (r1 + y) + 'Q' + x + ',' + y + ',' + (x + r1) + ',' + y +
	 	'L' + (x + w - r2 )+ ',' + y + 'Q' + (x + w) + ',' + y + ',' + (x + w) + ',' + (y + r2) +
	 	'L' + (x + w) + ',' + (y + h - r3) + 'Q' + (x + w) + ',' + (y + h) + ',' + (x + w - r3) + ',' + (y + h) +
	 	'L' + (x + r4) + ',' + (y + h) + 'Q' + x + ',' + (y + h) + ',' + x + ',' + (y + h - r4) + 'Z';
};

class RoundRect extends Component {
	constructor(d3Selection) {
		super(d3Selection.append('path'));

		this.attr({
			'top-left': 0,
			'top-right': 0,
			'bottom-left': 0,
			'bottom-right': 0
		});
	}

	update(duration, delay, ease) {
		let object = this.selection(),
			attr = this.attr(),
			toUpdate = this.toUpdate(),
			x = attr.x,
			y = attr.y,
			width = attr.width,
			height = attr.height,
			topLeft = attr['top-left'],
			topRight = attr['top-right'],
			bottomLeft = attr['bottom-left'],
			bottomRight = attr['bottom-right'];

		object = animate(object, duration, delay, ease);

		for (var key in toUpdate) {
			object = object.attr(key, attr[key]);
		}

		object = object.attr('d', roundedRectangle(x, y, width, height, topLeft, topRight, bottomRight, bottomLeft));

		return super.update(duration, delay, ease);
	}
}

/**
 * Tween method to perform transitions of Arc objects.
 * Ultimately returns a value for the 'd' attribute of a path.
 * 
 * @param 	initAttr	Initial attributes of the arc; those at the time of starting the transition.
 * @param 	endAttr		Final attributes of the arc; those at the time of ending the transition.
 * @return 				A function used by d3 to get the value for the 'd' attribute of a path.
 */
function arcTween(initAttr, endAttr) {
	var arc = d3.arc(),	
		startAngle = d3.interpolate(initAttr.startAngle, endAttr.startAngle),
		endAngle = d3.interpolate(initAttr.endAngle, endAttr.endAngle),
		innerRadius = d3.interpolate(initAttr.innerRadius, endAttr.innerRadius),
		outerRadius = d3.interpolate(initAttr.outerRadius, endAttr.outerRadius),
		cornerRadius = d3.interpolate(initAttr.cornerRadius, endAttr.cornerRadius),
		padAngle = d3.interpolate(initAttr.padAngle, endAttr.padAngle),
		padRadius = d3.interpolate(initAttr.padRadius, endAttr.padRadius);
	return function() {
		return function(t) {
			return arc
				.startAngle(startAngle(t))
				.endAngle(endAngle(t))
				.innerRadius(innerRadius(t))
				.outerRadius(outerRadius(t))
				.cornerRadius(cornerRadius(t))
				.padAngle(padAngle(t))
				.padRadius(padRadius(t))();
		};
	};
}

class Arc extends Component {
	// https://github.com/d3/d3-shape/blob/master/README.md#arc

	/**
	 * Initializes the d3-arc attributes as attributes of `this`.
	 */
	constructor(d3Selection) {
		super(d3Selection.append('path'));

		this.attr({
			startAngle: 0,
			endAngle: 0,
			innerRadius: 0,
			outerRadius: 100,
			cornerRadius: 0,
			padAngle: 0,
			padRadius: 0
		});
	}

	update(duration, delay, ease) {
		let object = this.selection(),
			attr = this.attr(),
			toUpdate = this.toUpdate(),
			arc = d3.arc();

		object = animate(object, duration, delay, ease);

		for (var key in toUpdate) {
			if (arc[key]) {
				arc = arc[key](attr[key]);
			} else {
				object = object.attr(key, attr[key]);
			}
		}

		if (duration || delay) {
			object = object.attrTween('d', arcTween(this.oldAttr(), attr));
		} else {
			object = object.attr('d', arc());
		}

		return super.update(duration, delay, ease);
	}
}

var Rect = Tag('rect'),
	Circle = Tag('circle'),
	Ellipse = Tag('ellipse'),
	G = Tag('g'),
	Path = Tag('path');

export { Rect, Circle, Ellipse, Path, G, RoundRect, Arc };
