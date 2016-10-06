var d3 = require('d3');

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
			var attr = this._attr,
				scale = attr.scale.domain(attr.domain).range(attr.range),
				selection = duration ? this._selection.transition().duration(duration).delay(delay || 0) : this._selection;
			selection.call(axis.scale(scale));
			return this;
		}
	}
}

class Component {
	constructor(d3Selection) {
		this._attr = {
			x: 0,
			y: 0,
			width: 0,
			height: 0
		};
		this._toUpdate = {};
		this._outerSelection = d3Selection;
		this._innerSelection = d3Selection.append('g');
		this._elements = [];
	}

	select(what) {
	    return this._outerSelection.select(what);
	}

	selectAll(what) {
	    return this._outerSelection.selectAll(what);
	}

	// returns the nth subcomponent (what) with class whatClass. If it doesn't exist, it is created.
	getOrCreateNth(what, index = 0, whatClass) {
	    var selection = whatClass ? this._innerSelection.selectAll('.' + whatClass) : this._innerSelection.selectAll(what);
	    if(selection.size() <= index) {
	        return this._innerSelection.append(what).attr('class', whatClass);
	    }
	    return d3.select(selection.nodes()[index]);
	}

	// returns the nth subcomponent (what) with class whatClass. If it doesn't exist, returns false.
	getNth(what, index = 0, whatClass) {
	    var selection = whatClass ? this._innerSelection.selectAll('.' + whatClass) : this._innerSelection.selectAll(what);
	    if(selection.size() <= index) {
	        return false;
	    }
	    return d3.select(selection.nodes()[index]);
	}

	// applies updatingFunction to a list of attributes if and only if at least one of them has been modified since the last call to .update()
	updateAttributes(attributeList, updatingFunction) {
		if(_.reduce(attributeList, (acc, attribute) => { return acc || this._toUpdate[attribute]; })) {
			let attributesToUpdate = [];
			_.forEach(attributeList, (attribute) => { attributesToUpdate.push(this._attr[attribute]); })
			updatingFunction(...attributesToUpdate);
		}
		return this;
	}

	// attr(): returns the object containing the object's attributes
	// attr(key, value): set attribute[key] = value; returns this
	// attr(attrs): extends the object's attributes with attrs; returns this
	attr(attributes, value) {
		if(attributes === undefined) return this._attr;
		if(value !== undefined) {
			let key = attributes;
			this._attr[key] = this._toUpdate[key] = value;
		} else {
			this._attr = _.extend(
				this._attr,
				attributes
			);
			this._toUpdate = _.extend(
				this._toUpdate,
				attributes
			);
		}
		return this;
	}

	toUpdate(...attributes) {
		this._toUpdate = _.extend(
			this._toUpdate,
			_.zipObject(attributes)
		);
		return this;
	}

	update(duration, delay) {
		var selection = this._outerSelection;
		if(duration) selection = selection.transition().duration(duration).delay(delay || 0);
		selection.attr('transform', `translate(${this._attr.x}, ${this._attr.y})`);
		this._toUpdate = {};
		_.forEach(this._elements, (element) => {
			element.updateSubComponent(this._attr);
			if(element.subcomponent && _.isFunction(element.subcomponent.update)) {
				element.subcomponent.update(duration, delay);
			}
		});
		return this;
	}

	append(componentFactory, updateSubComponent = function() {}) {
		var subcomponent = new componentFactory(this._outerSelection);
		this._elements.push({
			subcomponent,
			updateSubComponent: updateSubComponent.bind(subcomponent)
		});
		return subcomponent;
	}

	appendDomainAxis(x, y, axis) {
		return this.append(Axis(axis), function (attr) {
			this._attr.range = [attr.height, 0];
		})
	}
}

export { Component };