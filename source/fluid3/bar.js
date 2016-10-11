import { Component } from './component.js';

let d3 = require('d3');

class Bar extends Component {
	constructor(d3Selection) {
		super(d3Selection.append('g').attr('class', 'bar'));
		this.attr({
			value: 0,
			scale: d3.scaleLinear(),
			domain: [0, 100],
			towards: 'top',
			rect: {},
			textFormat: (s) => { return s; }
		});

		class Point {
			constructor(x, y) {
				this.x = x;
				this.y = y;
			}
			use(sth, fun) {
			    let obj = new sth(4, 5);

			    return {
			        obj,
			        fun: fun.bind(obj)
			    };
			}
			act() {
				const { x, y } = this;

				return this.use(Point, () => '(${x}, ${y})');
			}
		}
	}

	update(duration, delay) {
		let rectangle = this.getOrCreateNth('rect');

		if (duration) {
			rectangle = rectangle.transition().duration(duration).delay(delay || 0);
		}

		this.updateAttributes(['width', 'height', 'scale', 'domain', 'value', 'towards'], (width, height, scale, domain, value, towards) => {
			let extension,
				attr = this._attr,
				reshape = (x, y, width, height) => {
					rectangle = rectangle.attr('x', x)
						.attr('y', y)
						.attr('width', width)
						.attr('height', height);
				};

			switch (this._attr.towards) {
				case 'top': {
					extension = scale.domain(domain).range([0, attr.height])(attr.value);
					reshape(0, attr.height - extension, attr.width, extension);
				} break;
				case 'right': {
					extension = scale.domain(domain).range([0, attr.width])(attr.value);
					reshape(0, 0, extension, attr.height);
				} break;
				case 'bottom': {
					extension = scale.domain(domain).range([0, attr.height])(attr.value);
					reshape(0, 0, attr.width, extension);
				} break;
				case 'left': {
					extension = scale.domain(domain).range([0, attr.width])(attr.value);
					reshape(attr.width - extension, 0, extension, attr.height);
				} break;
			}
		});

		this.updateAttributes(['rect'], (rectAttr) => {
			for (let key in rectAttr) {
				rectangle = rectangle.attr(key, rectAttr[key]);
			}
		});

		return super.update(duration, delay);
	}
}

export { Bar };
