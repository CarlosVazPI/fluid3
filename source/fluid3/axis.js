import { Component } from './component.js';
import { animate } from './util.js';
let d3 = require('d3');

class Axis extends Component {
	constructor(chart, side, key) {
		super(chart.selection().append('g').attr('class', 'axis'));
		this.attr({
			padding: 20, // from 0 to the actual axis
			side: side || 'left', // 'top', 'bottom', 'left', 'right'
			key: key || 'domain',
			chart: chart,
			grid: {},
			tickFormat: (s) => s
		});
		this.axis = undefined;
	}

	update(duration, delay, ease) {
		let attr = this.attr(),
			chartAttr = attr.chart.attr(),
			x = 0,
			y = 0,
			toUpdate = this.toUpdate(),
			side = attr.side,
			isVertical = side === 'top' || side === 'bottom',
			domain = chartAttr[attr.key],
			isDimension = 'label' in domain,
			width = chartAttr.width,
			height = chartAttr.height,
			range = isVertical ? [0, width] : [0, height],
			scaleDomain = isDimension ? [0, domain.members.length * 2] : domain,
			ticks = isDimension ? domain.members.length * 2 : attr.ticks,
			tickFormat = isDimension ? (d, i) => {
				if (i % 2) {
					return attr.tickFormat(domain.members[(i - 1) / 2].label);
				} else {
					return '';
				}
			} : attr.tickFormat, 
			scale = (isDimension ? d3.scaleLinear() : chartAttr.scale).domain(scaleDomain).range(range),
			selection = this.selection(),
			translation = 'translate(',
			padding = attr.padding;

		switch(side) {
			case 'top':
				translation += x + ', ' + (padding + y) + ')';
			break;
			case 'left':
				translation += (padding + x) + ', ' + y + ')';
			break;
			case 'right':
				translation += (x + width - padding) + ', ' + y + ')';
			break;
			case 'bottom':
				translation += x + ', ' + (height - padding + y) + ')';
		}

		this.axis = d3['axis' + side.charAt(0).toUpperCase() + side.slice(1)](scale);
		selection.call(this.axis.tickFormat(tickFormat).ticks(ticks));
		animate(selection, duration, delay, ease).attr('transform', translation);

		if (isDimension) {
			selection.selectAll('.tick')
				.selectAll(function(t, i) {
					if (i % 2) {
						let line = d3.select(this).select('line');
						if (line.size()) {
							line. remove();
						}
					}
				});
		}

		// attr.chart.update(duration, delay, ease);

		return super.update(duration, delay, ease);
	}
}

export { Axis };