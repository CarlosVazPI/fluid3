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
	    let selection = whatClass ? this._innerSelection.selectAll('.' + whatClass) : this._innerSelection.selectAll(what);

	    if(selection.size() <= index) {
	        return this._innerSelection.append(what).attr('class', whatClass);
	    }
	    return d3.select(selection.nodes()[index]);
	}

	// returns the nth subcomponent (what) with class whatClass. If it doesn't exist, returns false.
	getNth(what, index = 0, whatClass) {
	    const { selectAll } = this._innerSelection;
		let selection = whatClass ? selectAll('.' + whatClass) : selectAll(what);

	    if(selection.size() <= index) {
	        return false;
	    }

	    return d3.select(selection.nodes()[index]);
	}

	// applies updatingFunction to a list of attributes if and only if at least one of them has been modified since the last call to .update()
	updateAttributes(attributeList, updatingFunction) {
		const hasToUpdate = attributeList.reduce((acc, attribute) => acc || this._toUpdate[attribute]);

		if(hasToUpdate) {
			let attributesToUpdate = [];

			attributeList.forEach((attribute) => {
				attributesToUpdate.push(this._attr[attribute]);
			});

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
			this._attr[attributes] = this._toUpdate[attributes] = value;
		} else {
			this._attr = _.extend(this._attr, attributes);
			this._toUpdate = _.extend(this._toUpdate, attributes);
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
		let selection = this._outerSelection;

		if(duration) selection = selection.transition().duration(duration).delay(delay || 0);

		selection.attr('transform', `translate(${this._attr.x}, ${this._attr.y})`);
		this._toUpdate = {};
		this._elements.forEach((element) => {
			element.update(this._attr);
			if(element.subcomponent && _.isFunction(element.subcomponent.update)) {
				element.subcomponent.update(duration, delay);
			}
		});
		return this;
	}

	append(componentFactory, update = () => {}) {
		let subcomponent = new componentFactory(this._outerSelection);

		this._elements.push({
			subcomponent,
			update: update.bind(subcomponent)
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
