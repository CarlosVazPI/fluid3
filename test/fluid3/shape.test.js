import { Rect, Circle, Ellipse, Path, G, RoundRect, Arc } from '../../source/fluid3/shape.js';
let d3 = require('d3');

describe('tag', function() {
	it('Should display an animated rectangle and circle', function() {
		return;
		const svg = d3.select('body').append('svg').attr('width', 800).attr('height', 500);
		// var a = svg.append('rect')
		// 	.attr('x', 0)
		// 	.attr('y', 0)
		// 	.attr('width', 10)
		// 	.attr('height', 10)
		// 	.attr('fill', 'black'),
		// 	b = a.transition()
		// 	.duration(1000)
		// 	.attr('x', 100);
		// a.transition().duration(1000).attr('fill','red');
		// svg.append('rect')
		// 	.attr('x', 0)
		// 	.attr('y', 0)
		// 	.attr('width', 10)
		// 	.attr('height', 10)
		// 	.attr('fill', 'red')
		// 	.attr('transform', 'translate(100), translate(100)');
		// svg.append('rect')
		// 	.attr('x', 0)
		// 	.attr('y', 0)
		// 	.attr('width', 10)
		// 	.attr('height', 10)
		// 	.attr('fill', 'blue')
		// 	.attr('transform', 'translate(100), rotate(45), translate(100)');
		// svg.append('rect')
		// 	.attr('x', 0)
		// 	.attr('y', 0)
		// 	.attr('width', 10)
		// 	.attr('height', 10)
		// 	.attr('fill', 'green')
		// 	.attr('transform', 'rotate(45), translate(100), translate(100)');

		var rect = new Rect(svg)
				.attr({
					x: 105,
					y: 5,
					width: 50,
					height: 50,
					fill: 'black'
				})
				.update()
				.attr({
					x: 300,
					rx: 10,
					ry: 10,
					fill: 'red',
					stroke: 'black',
					'stroke-width': 2
				})
				.update(1000, 500);
				// return;
		setTimeout(()=>{
			rect.attr({fill: 'blue'}).update(1000);
		}, 4500);
		// return;
		var g = new G(svg)
				.attr({
					transform: 'translate(200, 0)'
				})
				.update()
				.attr({
					transform: 'translate(0, 0)'
				})
				.update(1000, 500, d3.easeLinear),
			circle1 = new Circle(g.selection())
				.attr({
					cx: 200,
					cy: 50,
					r: 10,
				})
				.update()
				.attr({
					x: 400,
				})
				.update(1000, 500, d3.easeLinear),
			circle2 = new Circle(g.selection())
				.attr({
					cx: 200,
					cy: 100,
					r: 10,
				})
				.update()
				.attr({
					x: 400,
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
					transform: 'translate(200, 0)',
					d: 'M0,150L150,0L300,150',
					stroke: 'black',
					fill: 'none',
					'stroke-width': 2
				})
				.update()
				.attr({
					fill: 'yellow',
					'fill-opacity': 0,
					d: 'M0,150L150,0L300,150L150,80Z'
				})
				.update(0, 500)
				.attr({
					transform: 'rotate(90,150,100), scale(0.5), translate(150,100)',
					d: 'M0,150L100,0L200,150L100,80Z',
					'fill-opacity': 0.5,
					stroke: 'red'
				})
				.update(1000, 500);
				// return;
		var roundRect = new RoundRect(svg)
				.attr({
					x: 150,
					y: 150,
					width: 20,
					height: 20,
					fill: 'none',
					stroke: 'black',
					'top-left': 0,
					'top-right': 10,
					'bottom-left': 0,
					'bottom-right': 10
				})
				.update()
				.attr({
					width: 400
				})
				.update(1000, 500),
			// return;
			arc = new Arc(svg)
				.attr({
					transform: 'translate(550,100)',
					innerRadius: 0,
					outerRadius: 50,
					startAngle: 0,
					endAngle: Math.PI * 2,
					fill: 'cyan',
					stroke: 'black'
				})
				.update()
				.attr({
					cornerRadius: 4,
					innerRadius: 30
				})
				.update(1000, 500)
				.attr({
					endAngle: Math.PI / 2
				})
				.update(1000, 1500)
				.attr({
					innerRadius: 0,
					x: 300
				})
				.update(1000, 2500);
			arc.attr({
					startAngle: - 3 * Math.PI / 2
				})
				.update(1000, 3500);

		var a = svg.append('path')
				.attr('d', 'M100,100L200,200')
				.attr('stroke', 'black'),
			aTween = function() {
				var b = d3.interpolate(100, 200);
				return function(t) {
					return 'M' + b(t) + ',100L' + (300 - b(t)) + ',200';
				}
			};
		a.transition()
			.duration(1000)
			.delay(500)
			.attrTween('d', aTween);
	});
});
