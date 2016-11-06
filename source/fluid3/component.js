let d3 = require('d3');

class Component {

	/**
	 * Keeps track of
	 *	- the attributes of the component
	 *  - the attributes that have been updated
	 *  - the attributes as they were before the last update
	 *  - the selection in which the component is mounted
	 */
	constructor(d3Selection) {
		this._attr = {};
		this._oldAttr = {};
		this._toUpdate = {};
		this._selection = d3Selection;
	}

	/**
	 * Setter/getter of the selection in which the component is mounted.
	 * Chainable method if setter.
	 *	
	 * @param	group	If present, sets the d3-selection-object as the object
	 *					in which the component is mounted
	 * @return 			If setter, returns this. Returns the d3-selection-object
	 *					in which the component is mounted otherwise
	 */
	selection(group) {
		if (!group) {
			return this._selection;
		} else {
			this._selection = group;
			return this;
		}
	}

	/** 
	 * Setter/getter of attributes for the component.
	 * attr(): returns the object containing the object's attributes
	 * attr(key, value): set attribute[key] = value; returns this
	 * attr(attrs): extends the object's attributes with attrs; returns this
	 * Chainable method if setter.
	 *
	 * @param 	attributes	If present, if an object, extends current component's attributes
	 *						if not an object, it should be a key in the object's attributes
	 * @param	value		If present, sets the component's attribute corresponding to the
	 * 						key given in the previous param.
	 * @return 				If setter, returns this. If getter, returns the queried value
	 */
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

	/**
	 * Getter of the attributes previous to the last component's update.
	 *	
	 * @param	key		A key in the component's attributes
	 * @return 			If no param, returns the entire old attributes;
	 *					otherwise, returns just the value corresponding to the key
	 */
	oldAttr(key) {
		if(key !== undefined) {
			return this._oldAttr[key];
		} else {
			return this._oldAttr;
		}
	}

	/**
	 * Getter of the attributes to be updated (changed since the last component's update).
	 *	
	 * @param	key		A key in the component's attributes
	 * @return 			If no param, returns the entire changed attributes to be updated;
	 *					otherwise, returns the value corresponding to the key if it
	 *					has changed since the last update, or just undefined.
	 */
	toUpdate(key) {
		if(key !== undefined) {
			return this._toUpdate[key];
		} else {
			return this._toUpdate;
		}
	}

	/**
	 * Updates the component with the attributes that have changed since the last update.
	 * Chainable method.
	 *	
	 * @param	duration	Duration in ms of the transition if it is desired (or undefined).
	 * @param	delay		Delay in ms of the transition if it is desired (or undefined).
	 * @param	ease		D3 easing of the transition if it is desired (or undefined).
	 * @return 				This.
	 */
	update(duration, delay, ease) {
		this._oldAttr = Object.assign({}, this._attr);
		this._toUpdate = {};
		return this;
	}
}

export { Component };
