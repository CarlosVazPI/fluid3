import { Trend } from '../../source/fluid3/trend.js'

let d3 = require('d3');

describe('trend', function() {
	it('should rock', function() {
		return;
		// debugger;
		const svg = d3.select('body').append('svg').attr('width', 800).attr('height', 100);

		var trend = new Trend(svg)
			.attr({
				x: 10,
				y: 10,
				width: 300,
				height: 100,
				scale: d3.scaleLinear(),
				domain: [0, 10],
				values: [8,3,6,8,2],
				towards: 'top',
				pathAttrs: {
					stroke: 'black',
					fill: 'none'
				}
			})
			.update()
			.attr({
				width: 500
			})
			.update(1000, 500)
			.attr({
				values: [8,3,6,8,2,7,9,3,6,3,4,8,5,3,7],
			})
			.update(1, 1500);		
	});
});
