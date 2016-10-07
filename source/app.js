import { Bar } from './fluid3/bar.js';
import { SVGElement } from './fluid3/svgElement.js';
import _ from 'lodash';

let d3 = require('d3');


window.onload = () => {
	var canvasWidth = 850,
		canvasHeight = 500,
		svg = d3.select('body')
			.append('svg')
			.attr('width', canvasWidth)
			.attr('height', canvasHeight),
		bar = new Bar(svg),
		axis = bar.appendDomainAxis(0, 0, d3.axisLeft());
	axis._attr.scale = d3.scaleLog(),
	axis._attr.domain = [1, 100];
	//.update(1000,1000);
	bar
		.attr({
			x: 30,
			y: 10,
			height: 150,
			width: 50,
			value: 0.9,
			scale: d3.scaleLinear(),
			domain: [0, 1]
		})
		.update()
		.attr({
			towards: 'right',
			height: 50,
			width: 150
		})
		.update(1000);
	bar.select('rect')
		.attr('fill', 'red');
};
