import { Rect, Circle, Ellipse, Path } from '../../source/fluid3/tag.js';

let d3 = require('d3');

describe('tag', function() {
	it('Should display an animated rectangle and circle', function() {
		const svg = d3.select('body').append('svg').attr('width', 800).attr('height', 200);
		var rect = new Rect(svg)
				.attr({
					x: 0,
					y: 10,
					width: 50,
					height: 50,
					fill: 'black'
				})
				.update()
				.attr({
					x: 450,
					rx: 10,
					ry: 10,
					fill: 'red',
					stroke: 'black',
					'stroke-width': 2
				})
				.update(1000, 500),
			circle = new Circle(svg)
				.attr({
					cx: 100,
					cy: 70,
					r: 10,
					fill: 'white',
					stroke: 'black',
					'stroke-width': 2
				})
				.update()
				.attr({
					cy: 120,
					r: 20,
					fill: 'blue',
					'stroke-width': 0
				})
				.update(1000, 500),
			ellipse = new Ellipse(svg)
				.attr({
					cx: 50,
					cy: 120,
					rx: 50,
					ry: 20,
					fill: 'green',
					stroke: 'black',
					'stroke-width': 2
				})
				.update()
				.attr({
					ry: 50,
					rx: 20,
					fill: 'gray',
					'stroke-width': 0
				})
				.update(1000, 500),
			path = new Path(svg)
				.attr({
					transform: 'translate(200,0)',
					d: 'M0,150L150,0L300,150',
					stroke: 'black',
					fill: 'none',
					'stroke-width': 2
				})
				.update()
				.attr({
					d: 'M0,150L150,0L300,150L150,80Z'
				})
				.update(0, 500)
				.attr({
					d: 'M0,150L100,0L200,150L100,80Z',
					stroke: 'red'
				})
				.update(1000, 500);
	});
});
