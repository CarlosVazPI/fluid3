import { Component } from './component.js';
import { Axis } from './axis.js';
import { Side } from './util.js';

let d3 = require('d3');

class Chart extends Component {
	constructor(d3Selection) {
		super(d3Selection);
		this._axes = {};
	}
	axis(side) {
		return this._axes[side];
	}
	axes() {
		return this._axes;
	}
	appendAxis(side, key) {
		Side.checkSide(side);
		if (this._axes[side]) {
			this._axes[side].remove();
		}
		this._axes[side] = new Axis(this, side, key);
		return this._axes[side];
	}

	update(duration, delay, ease) {
		Object.keys(this._axes).forEach((side) => {
			this._axes[side].update(duration, delay, ease);
		});
		return super.update(duration, delay, ease);
	}
}
// class Chart extends Component {
	// constructor(d3Selection) {
	// 	this._attr = {
	// 		x: 0,
	// 		y: 0,
	// 		width: 0,
	// 		height: 0
	// 	};
	// 	this._toUpdate = {};
	// 	this._outerSelection = d3Selection;
	// 	this._innerSelection = d3Selection.append('g');
	// 	this._elements = [];
	// }

	// // returns the nth subcomponent (what) with class whatClass. If it doesn't exist, it is created.
	// getOrCreateNth(what, index = 0, whatClass) {
	//     const selection = whatClass ? this._innerSelection.selectAll('.' + whatClass) : this._innerSelection.selectAll(what);

	//     if(selection.size() <= index) {
	//         return this._innerSelection.append(what).attr('class', whatClass);
	//     }
	//     return d3.select(selection.nodes()[index]);
	// }

	// // returns the nth subcomponent (what) with class whatClass. If it doesn't exist, returns false.
	// getNth(what, index = 0, whatClass) {
	//     const selection = whatClass ? this._innerSelection.selectAll('.' + whatClass) : this._innerSelection.selectAll(what);
	// 		result = selection.size() <= index ? false : d3.select(selection.nodes()[index]);

	//     return result;
	// }

	// // applies updatingFunction to a list of attributes if and only if at least one of them has been modified since the last call to .update()
	// updateAttributes(attributeList, updatingFunction) {
	// 	const hasToUpdate = attributeList.reduce((acc, attribute) => acc || this._toUpdate[attribute]);

	// 	if(hasToUpdate) {
	// 		let attributesToUpdate = [],
	// 			data = this.container().data(),
	// 			datum = this.container().datum(),
	// 			i = data.indexOf(datum);

	// 		attributeList.forEach((attribute) => {
	// 			let value = this._attr[attribute],
	// 				updatingValue = typeof value === 'function' ? value(datum, i) : value;

	// 			attributesToUpdate.push(value);
	// 		});

	// 		updatingFunction(...attributesToUpdate);
	// 	}

	// 	return this;
	// }

	// update(duration, delay) {
	// 	let selection = this._outerSelection;

	// 	if(duration) selection = selection.transition().duration(duration).delay(delay || 0);

	// 	selection.attr('transform', `translate(${this._attr.x}, ${this._attr.y})`);
	// 	this._toUpdate = {};
	// 	this._elements.forEach((element) => {
	// 		element.update(this._attr);
	// 		if(element.subcomponent && _.isFunction(element.subcomponent.update)) {
	// 			element.subcomponent.update(duration, delay);
	// 		}
	// 	});
	// 	return this;
	// }

	// append(componentFactory, update = () => {}) {
	// 	let subcomponent = new componentFactory(this._outerSelection);

	// 	this._elements.push({
	// 		subcomponent,
	// 		update: update.bind(subcomponent)
	// 	});
	// 	return subcomponent;
	// }

	// appendDomainAxis(side) {
	// 	Side.checkSide(side);
	// 	throw 'TO DO';
	// }

	// appendDimensionAxis(side) {
	// 	Side.checkSide(side);
	// 	throw 'TO DO';
	// }
// }

export { Chart };
