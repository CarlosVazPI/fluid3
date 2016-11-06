import { Bar } from '../../source/fluid3/bar.js'
import { RoundRect } from '../../source/fluid3/shape.js';

let d3 = require('d3');

describe('bar', function() {
	it('should rock', function() {
		return;
		// debugger;
		const svg = d3.select('body').append('svg').attr('width', 800).attr('height', 100),
			a = svg.selectAll('g').data([9,2,6]).enter().append('g');

		var bar = new Bar(a)
			.attr({
				x: 10,
				y: (d, i) => (i || 0) * 25,
				width: 300,
				height: 25,
				scale: d3.scaleLinear(),
				domain: [0, 10],
				value: (d) => (d || 0),
				towards: 'right'
			})
			.update()
			.attr({
				value: (d) => 10-(d || 0),
				width: 500
			})
			.update(1000, 500);
		
// debugger;
		// bar.data([5,8,3,7,9]).update(1000, 1500);
	});
});
