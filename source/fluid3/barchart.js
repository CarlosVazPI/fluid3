import { Component } from './component.js';
import { Bar } from './bar.js';

let d3 = require('d3');

class Barchart extends Component {
	constructor(d3Selection) {
		super(d3Selection.append('g').attr('class', 'barchart'));
		this.attr({
			dimension: {},
			series: {},
			tuples: [],
			scale: d3.scaleLinear(),
			domain: [0, 100],
			towards: 'top'
		});
	}
	update(duration = 0, delay = 0) {
		let attr = this.attr(),
			width = attr.width,
			height = attr.height,
			dimension = attr.dimension,
			tuples = attr.tuples,
			towards = attr.towards,
			scale = attr.scale,
			barWidth = width / dimension.members.length,
			tuplesByDimension = {};

		dimension.members.forEach((d) => {
			tuplesByDimension[d.label] = tuples.filter((t) => t[dimension.label] === d.label)[0];
		})

		new Bar(this.container().selectAll('g.part')
				.data(dimension.members.map((d) => d.label))
				.enter()
				.append('g')
				.attr('class', 'part')
			)
			.attr({
				value: (d) => tuplesByDimension[d],
				scale,
				towards,
				height,
				width : barWidth,
				y: 0,
				x: (d, i) => i * barWidth
			})
			.update();

		return super.update(duration, delay);
	}
}

export { Barchart };
