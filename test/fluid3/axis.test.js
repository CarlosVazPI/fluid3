import { Axis } from '../../source/fluid3/axis.js'
import { RoundRect } from '../../source/fluid3/shape.js';

let d3 = require('d3');

describe('axis', function() {
	it('should rock', function() {
		return;
		const svg = d3.select('body').append('svg').attr('width', 800).attr('height', 200);
		var axisDomain = new Axis(svg)
				.attr({
					x: 10,
					y: 10,
					width: 300,
					height: 90,
					padding: 30,
					scale: d3.scaleLinear(),
					domain: [0, 200],
					side: 'left'
				})
				.update()
				.attr({
				})
				.update(1000, 500),
			axisDimension = new Axis(svg)
				.attr({
					x: 40,
					y: 10,
					width: 300,
					height: 100,
					padding: 10,
					scale: d3.scaleLinear(),
					domain: {label: 'a', members: [{label: 'a1'}, {label: 'a2'}]},
					side: 'bottom'
				})
				.update()
				.attr({
				})
				.update(1000, 500);
	});
});
