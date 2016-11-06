import { Component } from './component.js';
import { animate } from './util.js';
let d3 = require('d3');

class Axis extends Component {

	/**
	 * Keeps track of
	 *	- padding		space reserved for the axis inside the chart
	 *	
	 * @param	chart 	object of class Chart
	 * @param	side	where the axis has to be put
	 * @param	key		what attribute of the chart is the domain of the axis
	 */
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

	/**
	 * Creates/modifies the axis
	 *	
	 * @param	duration	Duration in ms of the transition if it is desired (or undefined).
	 * @param	delay		Delay in ms of the transition if it is desired (or undefined).
	 * @param	ease		D3 easing of the transition if it is desired (or undefined).
	 * @return 				This.
	 */
	update(duration, delay, ease) {
		let attr = this.attr(),
			chart = attr.chart,
			chartAttr = chart.attr(),
			invertDomain = chartAttr.towards === 'top' || chartAttr.towards === 'left',
			x = 0,
			y = 0,
			translation = 'translate(',
			toUpdate = this.toUpdate(),
			side = attr.side,
			isVertical = side === 'top' || side === 'bottom',
			domain = chartAttr[attr.key],
			isDimension = 'label' in domain,
			width = chart.innerWidth(),
			height = chart.innerHeight(),
			range = isVertical ? [0, width] : [0, height],
			scaleDomain = isDimension ? [0, domain.members.length * 2] : invertDomain ? [domain[1], domain[0]] : domain,
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
			padding = attr.padding;

		switch(side) {
			case 'top':
			case 'left':
				translation += x + ', ' + y + ')';
			break;
			case 'right':
				translation += (x + width) + ', ' + y + ')';
			break;
			case 'bottom':
				translation += x + ', ' + (height + y) + ')';
		}

		this.axis = d3['axis' + side.charAt(0).toUpperCase() + side.slice(1)](scale);
		animate(selection, duration, delay, ease)
			.call(this.axis.tickFormat(tickFormat).ticks(ticks))
			.attr('transform', translation);

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

		return super.update(duration, delay, ease);
	}
}

export { Axis };