var palette = [];

function SVG(width, height, className) {
	return d3.select('body')
		.append('g')
		.attr('width', width)
		.attr('height', height)
		.attr('class', className);
}