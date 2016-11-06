let d3 = require('d3');

/**
 * Creates a transition of a d3 selection if needed
 *	
 * @param	object 		d3 selection to animate (to create the transition)
 * @param	duration	Duration in ms of the transition
 * @param	delay		Delay in ms for the transition
 * @param	ease		Ease of the transition (d3 v4 API)
 * @return 				If duration or delay, returns a d3-transition over the object;
 *						returns the unmodified object otherwise.
 */
function animate(object, duration, delay, ease) {
	if (duration || delay) {
		return object.transition().duration(duration || 0).ease(ease || d3.easePolyInOut).delay(delay || 0);
	} else {
		return object;
	}
};

export { animate };
