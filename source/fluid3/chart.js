import { Component } from './component.js';
import { Axis } from './axis.js';

let d3 = require('d3');

/**
 * The Chart class deals with axes
 */

class Chart extends Component {

	/**
	 * Initializes the object _axes to hold a reference to the four possible axes of the chart
	 */
	constructor(d3Selection) {
		super(d3Selection);
		this._axes = {};
	}

	/**
	 * @return 	The inner width of the chart, i.e., the total width discounted the paddings
	 * 			of left and right axes.
	 */
	innerWidth() {
		let attr = this.attr(),
			axes = this.axes(),
			paddingLeft = axes.left ? axes.left.attr('padding') : 0,
			paddingRight = axes.right ? axes.right.attr('padding') : 0;

		return attr.width - paddingLeft - paddingRight;
	}

	/**
	 * @return 	The inner height of the chart, i.e., the total height discounted the paddings
	 * 			of top and bottom axes.
	 */
	innerHeight() {
		let attr = this.attr(),
			axes = this.axes(),
			paddingTop = axes.top ? axes.top.attr('padding') : 0,
			paddingBottom = axes.bottom ? axes.bottom.attr('padding') : 0;

		return attr.height - paddingTop - paddingBottom;
	}

	/**
	 * @return 	The X position for the chart, i.e., the main X plus the left padding
	 */
	left() {
		let attr = this.attr(),
			axes = this.axes(),
			paddingLeft = axes.left ? axes.left.attr('padding') : 0;

		return attr.x + paddingLeft;
	}

	/**
	 * @return 	The Y position for the chart, i.e., the main Y plus the top padding
	 */
	top() {
		let attr = this.attr(),
			axes = this.axes(),
			paddingTop = axes.top ? axes.top.attr('padding') : 0;

		return attr.y + paddingTop;
	}

	/**
	 * @param	side 	A side (top, bottom, left, right)
	 * @return 			The axis corresponding to the given side
	 */
	axis(side) {
		return this._axes[side];
	}

	/**
	 * @return 	The _axes object that holds all the axes of the chart
	 */
	axes() {
		return this._axes;
	}

	/**
	 * Creates an axis for the chart in the given side.
	 * This is NOT a chainable method.
	 *	
	 * @param	side 	A side (top, bottom, left, right)
	 * @return 			The created axis (a reference to it)
	 */
	appendAxis(side, key) {
		if (this._axes[side]) {
			this._axes[side].remove();
		}
		this._axes[side] = new Axis(this, side, key);
		return this._axes[side];
	}

	/**
	 * Updates the axes.
	 * Chainable method.
	 *
	 * @return 	this
	 */
	update(duration, delay, ease) {
		Object.keys(this._axes).forEach((side) => {
			this._axes[side].update(duration, delay, ease);
		});
		return super.update(duration, delay, ease);
	}
}

export { Chart };
