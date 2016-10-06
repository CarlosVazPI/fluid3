import { Bar } from './fluid3/bar.js';
import { SVGElement } from './fluid3/svgElement.js';
import _ from 'lodash';
var d3 = require('d3');

var fluid3 = {
	Bar
};

// window.a = 9;

export { fluid3 as default };

// window.onload = () => {
// 	var canvasWidth = 850,
// 		canvasHeight = 500,
// 		svg = d3.select('body')
// 			.append('svg')
// 			.attr('width', canvasWidth)
// 			.attr('height', canvasHeight),
// 		bar = new Bar(svg);
// 		// axis = bar.appendDomainAxis(0, 0, d3.axisLeft());
// 	// axis._attr.scale = d3.scaleLog(),
// 	// axis._attr.domain = [1, 100];

// 	bar
// 		.attr({
// 			x: 30,
// 			y: 10,
// 			height: 50,
// 			width: 150,
// 			value: 0,
// 			scale: d3.scaleLinear(),
// 			domain: [0, 1],
// 			towards: 'top'
// 		})
// 		.update()
// 		.attr('value', 1)
// 		.update(1000)
// 		.attr({x:100})
// 		.update(1000,1000);

// 	let secondbar = bar.append(Bar, function(attr) {
// 			this.attr('value', attr.value);
// 		})
// 		.attr({
// 			x: 100,
// 			y: 100,
// 			width: 100,
// 			height: 100,
// 			value: 0,
// 			domain: [0, 1]
// 		}).update();

// 	secondbar.select('rect')
// 		.attr('fill', 'red');
	
// 	// 	.attr({
// 	// 		towards: 'right',
// 	// 		height: 50,
// 	// 		width: 150
// 	// 	})
// 	// 	.update(1000);
// 	// bar.select('rect')
// 	// 	.attr('fill', 'red');
// };