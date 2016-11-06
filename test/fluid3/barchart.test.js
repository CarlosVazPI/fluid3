import { Barchart } from '../../source/fluid3/barchart.js'
import { Bar } from '../../source/fluid3/bar.js'

let d3 = require('d3');

describe('barchart', function() {
	it('should rock', function() {
        // return;
		const svg = d3.select('body').append('svg').attr('width', 800).attr('height', 500),
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
            },
            x = 50,
            y = 50,
            width = 100,
            height = 100;

// svg.append('rect').attr('x', x).attr('y', y).attr('width', width).attr('height', height).attr('fill', 'none').attr('stroke', 'black');

		var barchart = new Barchart(svg)
    			.attr({
                    x: 50,
                    y: 50,
                    width: 100,
                    height: 100,
    				scale: d3.scaleLinear(),
    				domain: [0, 100],
    				dimension: data.dimensions.author,
                    tuples: data.tuples,
                    bar: {
                        shapeAttrs: {
                            fill: (d, i) => palette[i % palette.length],
                            stroke: (d, i) => i === 1 ? 'black' : 'none'
                        }
                    },
                    gap: 0
        		})
        		.update(),
            domainAxis = barchart.appendAxis('left', 'domain')
                .attr({
                    padding: 30,
                    grid: {
                        stroke: 'gray',
                        'stroke-dasharray': '.'
                    }
                }),
                // .update(), // should update barchart as well because of the padding
            dimensionAxis = barchart.appendAxis('bottom', 'dimension')
                .attr({
                    padding: 10
                });
                // .update(); // should update barchart as well because of the padding
                // debugger;
        barchart.update();
        barchart
            .attr('width', 200)
            // .update(1000)
            .attr('height', 200)
            // .update(1000, 1000)
            .attr('domain', [1, 70])
            .attr('scale', d3.scaleLog())
            .update(1000, 500);

        // data.dimensions.author.members.push({ label: 'Abercrombie' });
        // data.tuples.push({ author: 'Abercrombie', value: 46 });

        // barchart.attr({
        //     dimension: data.dimensions.author,
        //     tuples: data.tuples
        // }).update(1000, 1500);
	});
});
