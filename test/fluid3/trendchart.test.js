import { Trendchart } from '../../source/fluid3/trendchart.js'

let d3 = require('d3');

describe('trendchart', function() {
	it('should rock', function() {
		// return;
		// debugger;
		const svg = d3.select('body').append('svg').attr('width', 800).attr('height', 150),
            palette = ['red', 'green', 'blue'],
            data = {
                dimensions: {
                    author: {
                        label: 'author',
                        members: [
                            { label: 'Tolkien' },
                            { label: 'Martin' },
                            { label: 'Sanderson' },
                            { label: 'Rothfuss' }
                        ]
                    }
                },
                tuples: [
                    { author: 'Tolkien', value: 1 },
                    { author: 'Martin', value: 2 },
                    { author: 'Sanderson', value: 70 },
                    { author: 'Rothfuss', value: 10 }
                ]
            };

		var trendchart = new Trendchart(svg)
			.attr({
				x: 10,
				y: 10,
				width: 300,
				height: 100,
				dimension: data.dimensions.author,
				tuples: data.tuples,
				scale: d3.scaleLinear(),
				domain: [0, 100],
				towards: 'top'
			})
			.update()
			.attr({
				width: 500
			})
			.update(1000, 500);
	});
});
