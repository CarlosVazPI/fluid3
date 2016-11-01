import { Component } from './component.js';
import { Side } from './util.js';

let d3 = require('d3');

class Chart extends Component {
	appendDomainAxis(side) {
		Side.checkSide(side);
		throw 'TO DO';
	}

	appendDimensionAxis(side) {
		Side.checkSide(side);
		throw 'TO DO';
	}
}

export { Component };
