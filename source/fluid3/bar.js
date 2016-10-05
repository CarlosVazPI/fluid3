import { Component } from './component.js';
var d3 = require('d3');

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
			    var obj = new sth(4, 5);
			    return {
			        obj: obj,
			        fun: fun.bind(obj)
			    };
			}
			act() {
				return this.use(Point, () => {
				    return '(' + this.x + ', ' + this.y + ')';
				});
			}
		}
	}
	update(duration, delay) {
		var rectangle = this.getOrCreateNth('rect');
		if(duration) rectangle = rectangle.transition().duration(duration).delay(delay || 0);

		this.updateAttributes(['width', 'height', 'scale', 'domain', 'value', 'towards'], (width, height, scale, domain, value, towards) => {
			var attr = this._attr,
				reshape = (x, y, width, height) => {
					rectangle = rectangle.attr('x', x)
						.attr('y', y)
						.attr('width', width)
						.attr('height', height);
				};
			switch(this._attr.towards) {
				case 'top': {
					let extension = scale.domain(domain).range([0, attr.height])(attr.value);
					reshape(0, attr.height - extension, attr.width, extension);
				} break;
				case 'right': {
					let extension = scale.domain(domain).range([0, attr.width])(attr.value);
					reshape(0, 0, extension, attr.height);
				} break;
				case 'bottom': {
					let extension = scale.domain(domain).range([0, attr.height])(attr.value);
					reshape(0, 0, attr.width, extension);
				} break;
				case 'left': {
					let extension = scale.domain(domain).range([0, attr.width])(attr.value);
					reshape(attr.width - extension, 0, extension, attr.height);
				} break;
			}
		});

		this.updateAttributes(['rect'], (rectAttr) => {
			for(let key in rectAttr) {
				rectangle = rectangle.attr(key, rectAttr[key]);
			}
		});

		return super.update(duration, delay);
	}
}

export { Bar };