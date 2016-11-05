let d3 = require('d3');

class Component {
	constructor(d3Selection) {
		this._attr = {};
		this._oldAttr = {};
		this._toUpdate = {};
		this._selection = d3Selection;
	}

	selection() {
		return this._selection;
	}

	select(what) {
	    return this._selection.select(what);
	}

	selectAll(what) {
	    return this._selection.selectAll(what);
	}

	// attr(): returns the object containing the object's attributes
	// attr(key, value): set attribute[key] = value; returns this
	// attr(attrs): extends the object's attributes with attrs; returns this
	attr(attributes, value) {
		if (attributes === undefined) {
			return this._attr;
		} else if (value !== undefined) {
			this._attr[attributes] = this._toUpdate[attributes] = value;
		} else if (typeof attributes === 'object') {
			this._attr =  Object.assign(this._attr, attributes);
			this._toUpdate =  Object.assign(this._toUpdate, attributes);
		} else {
			return this._attr[attributes];
		}

		return this;
	}

	oldAttr(key) {
		if(key !== undefined) {
			return this._oldAttr[key];
		} else {
			return this._oldAttr;
		}
	}

	toUpdate(...attributes) {
		if(attributes.length == 0) return this._toUpdate;

		this._toUpdate = Object.assign(this._toUpdate, _.zipObject(attributes));

		return this;
	}

	update(duration, delay, ease) {
		this._oldAttr = Object.assign({}, this._attr);
		this._toUpdate = {};
		return this;
	}
}

export { Component };
