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
			secondaryGap: 0,
			dimension: {},
			series: {},
			tuples: [],
			scale: d3.scaleLinear(),
			domain: [0, 100],
			towards: 'top',
			bar: {}
		});
	}

	update(duration = 0, delay = 0, ease) {
		let attr = this.attr(),
			axes = this.axes(),
			group = this.selection(),
			paddingTop = axes.top ? axes.top.attr('padding') : 0,
			paddingLeft = axes.left ? axes.left.attr('padding') : 0,
			paddingRight = axes.right ? axes.right.attr('padding') : 0,
			paddingBottom = axes.bottom ? axes.bottom.attr('padding') : 0,
			x = attr.x + paddingLeft,
			y = attr.y + paddingTop,
			width = attr.width - paddingLeft - paddingRight,
			height = attr.height - paddingTop - paddingBottom,
			dimension = attr.dimension,
			tuples = attr.tuples,
			towards = attr.towards,
			scale = attr.scale,
			barWidth = width / dimension.members.length,
			tuplesByDimension = {},
			gap = attr.gap,
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

		var bar = new Bar(this.selection().selectAll('g.part')
				.data(dimension.members.map((d) => d.label))
				.enter()
				.append('g')
				.attr('class', 'part')
			)
			.attr(Object.assign({}, {
				value: (d) => tuplesByDimension[d].value,
				scale,
				towards,
				height,
				width : barWidth - gap,
				y: 0,
				x: (d, i) => i * barWidth + gap / 2
			}, barAttrs));

		bar.update();

		return super.update(duration, delay);
	}
}

export { Barchart };
