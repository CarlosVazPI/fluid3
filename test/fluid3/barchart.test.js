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
                    { author: 'Tolkien', value: 70 },
                    { author: 'Martin', value: 66 },
                    { author: 'Sanderson', value: 46 },
                    { author: 'Rothfuss', value: 53 }
                ]
            },
            x = 50,
            y = 50,
            width = 100,
            height = 100;

svg.append('rect').attr('x', x).attr('y', y).attr('width', width).attr('height', height).attr('fill', 'none').attr('stroke', 'black');

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
        		.update();
            // domainAxis = barchart.appendAxis('left', 'domain')
            //     .attr({
            //         padding: 30,
            //         grid: {
            //             stroke: 'gray',
            //             'stroke-dasharray': '.'
            //         }
            //     })
            //     .update(), // should update barchart as well because of the padding
            // dimensionAxis = barchart.appendAxis('bottom', 'dimension')
            //     .attr({
            //         padding: 10
            //     })
            //     .update(); // should update barchart as well because of the padding
        barchart
            .attr('width', 200)
            .update();  

        barchart.attr({
            height: 200,
            width: 200
        }); // It should update axes as well
	});
});
