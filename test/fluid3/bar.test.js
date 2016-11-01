import { Bar } from '../../source/fluid3/bar.js'

let d3 = require('d3');

describe('bar', function() {
	it('should rock', function() {
		const svg = d3.select('body').append('svg').attr('width', 800).attr('height', 500);
		var bar = new Bar(svg)
			.attr({
				scale: d3.scaleLinear(),
				domain: [0, 100],
				value: 100,
				towards: 'top'
			})
			.update();
	});
});
