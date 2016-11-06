import { Chart } from './chart.js';
import { Trend } from './trend.js';
import { animate } from './util.js';

let d3 = require('d3');

class Trendchart extends Chart {
	constructor(d3Selection) {
		super(d3Selection.append('g').attr('class', 'barchart'));
		this.attr({
			x: 0,
			y: 0,
			width: 100,
			height: 100,
			dimension: {},
			series: {members: []},
			tuples: [],
			scale: d3.scaleLinear(),
			domain: [0, 100],
			towards: 'top',
			trend: {
				stroke: 'black',
				fill: 'none'
			}
		});
		this.trend = undefined;
	}

	update(duration = 0, delay = 0, ease) {
		let attr = this.attr(),
			group = this.selection(),
			x = this.left(),
			y = this.top(),
			width = this.innerWidth(),
			height = this.innerHeight(),
			dimension = attr.dimension,
			series = attr.series,
			tuples = attr.tuples,
			towards = attr.towards,
			scale = attr.scale,
			valuesBySerie = {},
			domain = attr.domain,
			trendAttr = attr.trend;

		group = animate(group, duration, delay, ease);

		group.attr('transform', (d, i, a) => {
			var xPos = typeof x === 'function' ? x(d, i, a) : x,
				yPos = typeof y === 'function' ? y(d, i, a) : y;
				
			return 'translate(' + xPos + ', ' + yPos + ')';
		});

		var noSeries = (!series.members || !series.members.length),
			seriesMembers = noSeries ? [{ label: undefined }] : series.members;

		seriesMembers.forEach((serie) => {
			valuesBySerie[serie.label] = dimension.members.map((d) => 
				tuples.find((tuple) => 
					tuple[dimension.label] === d.label && (!serie.label || tuple[series.label] === serie.label)).value
			);
		});

		var selectedGroups = this.selection().selectAll('g.part')
				.data(seriesMembers.map((d) => d.label))
				.enter()
				.append('g')
				.attr('class', 'part'),
			values = noSeries ? (d) => valuesBySerie[d] : valuesBySerie[undefined];

		if (!this.trend) {
			this.trend = new Trend(selectedGroups)
				.attr({ values });
		}

		this.trend.attr({
				scale,
				towards,
				height,
				domain,
				width,
				y: 0,
				x: 0
			})
			.attr({ pathAttr: trendAttr })
			.update(duration, delay, ease);

		return super.update(duration, delay, ease);
	}
}

export { Trendchart };
