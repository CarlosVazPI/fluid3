import { Bar } from '../../source/fluid3/bar.js'
import { RoundRect } from '../../source/fluid3/shape.js';

let d3 = require('d3');

describe('bar', function() {
	it('should rock', function() {
		return;
		const svg = d3.select('body').append('svg').attr('width', 800).attr('height', 100);
		var bar = new Bar(svg)
			.attr({
				x: 40,
				y: 10,
				width: 300,
				height: 50,
				scale: d3.scaleLinear(),
				domain: [0, 100],
				value: 0,
				shape: RoundRect,
				shapeAttrs: {
					'top-right': 25,
					'bottom-right': 25,
					fill: 'red'
				},
				towards: 'right'
			})
			.update()
			.attr({
				value: 100,
			})
			.update(1000, 500);
	});
});
