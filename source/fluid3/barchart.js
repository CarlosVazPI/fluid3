import { Component } from './component.js';
import { Chart } from './chart.js';
import { Bar } from './bar.js';
import { animate } from './util.js';

let d3 = require('d3');

class Barchart extends Chart {
	constructor(d3Selection) {
		super(d3Selection.append('g').attr('class', 'barchart'));
		this.attr({
			x: 0,
			y: 0,
			width: 100,
			height: 100,
			gap: 6,
			// secondaryGap: 0,
			dimension: {},
			// series: {},
			tuples: [],
			scale: d3.scaleLinear(),
			domain: [0, 100],
			towards: 'top',
			bar: {}
		});
		this.bar = undefined;
	}

	update(duration = 0, delay = 0, ease) {
		let attr = this.attr(),
			group = this.selection(),
			x = this.left(),
			y = this.top(),
			width = this.innerWidth(),
			height = this.innerHeight(),
			dimension = attr.dimension,
			tuples = attr.tuples,
			towards = attr.towards,
			scale = attr.scale,
			barWidth = width / dimension.members.length,
			tuplesByDimension = {},
			domain = attr.domain,
			gap = attr.gap,
			// secondaryGap = attr.secondaryGap,
			barAttrs = attr.bar;

		group = animate(group, duration, delay, ease);

		group.attr('transform', (d, i, a) => {
			var xPos = typeof x === 'function' ? x(d, i, a) : x,
				yPos = typeof y === 'function' ? y(d, i, a) : y;
				
			return 'translate(' + xPos + ', ' + yPos + ')';
		});

		dimension.members.forEach((d) => {
			tuplesByDimension[d.label] = tuples.filter((t) => t[dimension.label] === d.label)[0];
		})

		var selectedGroups = this.selection().selectAll('g.part')
				.data(dimension.members.map((d) => d.label))
				.enter()
				.append('g')
				.attr('class', 'part');

		if (!this.bar) {
			this.bar = new Bar(selectedGroups);
		}
		this.bar.attr(Object.assign({}, {
			value: (d) => tuplesByDimension[d].value,
			scale,
			towards,
			height,
			domain,
			width : barWidth - gap,
			y: 0,
			x: (d, i) => i * barWidth + gap / 2
		}, barAttrs))
		.update(duration, delay, ease);

		return super.update(duration, delay, ease);
	}
}

export { Barchart };
