var SVG = function(name, width, height) {
	return d3.select('body').append('svg').attr('class', name).attr('width', width).attr('height', height);
};
