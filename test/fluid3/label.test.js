import { Label } from '../../source/fluid3/label.js'

const d3 = require('d3');

describe('label', function() {
	it('should rock', function() {
		return;
		const svg = d3.select('body').append('svg').attr('width', 800).attr('height', 500);

		var labelAttr = {
			width: 100,
			height: 100,
			text: 'One two three four five six seven eight nine ten eleven twelve thirteen fourteen fifteen',
			'font-size': 12,
			'font-family': 'arial'
		};

		new Label(svg)
			.attr(labelAttr)
			.attr({
				x: 0,
				y: 0,
				'vertical-alignment': 'top',
				'horizontal-alignment': 'center',
			}).update();

		new Label(svg)
			.attr(labelAttr)
			.attr({
				x: 100,
				y: 0,
				'vertical-alignment': 'top',
				'horizontal-alignment': 'center',
			}).update();

		new Label(svg)
			.attr(labelAttr)
			.attr({
				x: 200,
				y: 0,
				'vertical-alignment': 'top',
				'horizontal-alignment': 'right',
			}).update();



		new Label(svg)
			.attr(labelAttr)
			.attr({
				x: 0,
				y: 100,
				'vertical-alignment': 'middle',
				'horizontal-alignment': 'left',
			}).update();

		new Label(svg)
			.attr(labelAttr)
			.attr({
				x: 100,
				y: 100,
				'vertical-alignment': 'middle',
				'horizontal-alignment': 'center',
			}).update();

		new Label(svg)
			.attr(labelAttr)
			.attr({
				x: 200,
				y: 100,
				'vertical-alignment': 'middle',
				'horizontal-alignment': 'right',
			}).update();



		new Label(svg)
			.attr(labelAttr)
			.attr({
				x: 0,
				y: 200,
				'vertical-alignment': 'bottom',
				'horizontal-alignment': 'left',
			}).update();

		new Label(svg)
			.attr(labelAttr)
			.attr({
				x: 100,
				y: 200,
				'vertical-alignment': 'bottom',
				'horizontal-alignment': 'center',
			}).update();

		new Label(svg)
			.attr(labelAttr)
			.attr({
				x: 200,
				y: 200,
				'vertical-alignment': 'bottom',
				'horizontal-alignment': 'right',
			}).update();
	});
});
