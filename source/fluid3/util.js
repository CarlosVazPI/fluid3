var Side = {
	isSide: function (side) {
		return side === 'top' || side === 'bottom' || side === 'left' || side === 'right';
	},
	checkSide: function(side) {
		if (side !== 'top' && side !== 'bottom' && side !== 'left' && side !== 'right') {
			throw side + ' is not a valid side (top, bottom, left, rigth)';
		}
	}
};

function animate(object, duration, delay) {
	if (duration || delay) {
		return object.transition().duration(duration || 0).delay(delay || 0);
	} else {
		return object;
	}
};

export { Side, animate };