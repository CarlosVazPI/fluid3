import { Component } from './component.js';

let d3 = require('d3');

class Label extends Component {
	constructor(d3Selection) {
		super(d3Selection.append('g').attr('class', 'label'));
		this.props = {
			text: 'label',
			'vertical-alignment': 'middle', // 'top', 'bottom', 'middle'
			'horizontal-alignment': 'center', // 'left', 'right', 'center'
			wrapChar: '-',
			splitWords: true,
			x: 0,
			y: 0,
			width: false,
			height: false,
			overflow: '...',
			lineHeight: (h) => h
		};
		this.attr(this.props);
	}

	update(duration, delay) {
		let attr = this.attr(),
			toUpdate = this.toUpdate(),
			width = attr.width,
			height = attr.height,
			splitWords = attr.splitWords,
			wrapChar = attr.wrapChar,
			words = attr.text.split(' ').reverse(),
			overflow = attr.overflow,
			toTop = attr['vertical-alignment'] == 'top',
			toMiddle = attr['vertical-alignment'] == 'middle',
			toBottom = attr['vertical-alignment'] == 'bottom',
			toLeft = attr['horizontal-alignment'] == 'left',
			toRight = attr['horizontal-alignment'] == 'right',
			paragraph = this.container().append('g').attr('class', 'paragraph'),
			y = 0,
			lineText = '',
			oldText = '',
			lineHeight = attr.lineHeight,
			newLine = (container, yPos) => {
				let lineToStylize = container.append('text').attr('class', 'line').attr('y', yPos);
				lineToStylize = lineToStylize.attr('alignment-baseline', 'hanging');
				for(let key in toUpdate) {
					if(!(key in this.props)) {
						lineToStylize = lineToStylize.attr(key, attr[key]);
					}
				}
				if(toLeft) {
					lineToStylize = lineToStylize.attr('text-anchor', 'start');
				} else if(toRight) {
					lineToStylize = lineToStylize.attr('text-anchor', 'end')
						.attr('x', width);
				} else {
					lineToStylize = lineToStylize.attr('text-anchor', 'middle')
						.attr('x', width / 2);
				}
				return lineToStylize;
			};

		let line = newLine(paragraph),
			overflowElement = newLine(paragraph, 0).text(overflow),
			overflowBBox = overflowElement.node().getBBox(),
			paragraphHeight = overflowBBox.height + overflowBBox.y,
			isLastLine = height && (paragraphHeight + overflowBBox.height > height),
			extraWidth = isLastLine ? overflowBBox.width : 0,
			finish = false,
			word = '',
			splittingWordCounter = 0,
			wrapCharElement = newLine(paragraph, 0).text(wrapChar),
			wrapCharBBox = wrapCharElement.node().getBBox(),
			computedHeight = lineHeight(overflowBBox.height);

		wrapCharElement.remove();
		overflowElement.remove();

		while(words.length && !finish) {
			word = words.pop();
			oldText = lineText;
			lineText += ' ' + word;
			line.text(lineText);
			let lineBBox = line.node().getBBox();

			if(width && lineBBox.width + extraWidth > width) {
				if(isLastLine) {
					if(splitWords) {
						let noSpaceText = oldText;
						lineText = oldText + ' ';
						for(let i = 0; i < word.length && !finish; i++) {
							oldText = lineText;
							lineText += word[i];
							line.text(lineText);
							lineBBox = line.node().getBBox();
							if(lineBBox.width + overflowBBox.width > width) {
								lineText = (i ? oldText : noSpaceText) + overflow;
								finish = true;
							}
						}
					} else {
						lineText = oldText + overflow;
					}
					line.text(lineText);
					finish = true;
				} else {
					lineText = oldText + ' ';
					if(splitWords) {
						for(let i = 0; i < word.length && !finish; i++) {
							oldText = lineText;
							lineText += word[i];
							line.text(lineText);
							lineBBox = line.node().getBBox();
							if(lineBBox.width + wrapCharBBox.width > width) {
								oldText += (i > 0 ? wrapChar : '');
								words.push(word.slice(i));
								finish = true;
							}
						}
						finish = false;
					} else {
						words.push(word);
					}

					y += computedHeight;
					paragraphHeight += computedHeight;
					line.text(oldText);
					lineText = oldText = '';
					line = newLine(paragraph, y);
					isLastLine = height && (paragraphHeight + computedHeight > height);
					extraWidth = isLastLine ? overflowBBox.width : 0;
				}
			}
		}

		if(toMiddle) {
			paragraph.attr('transform', 'translate(0, ' + ((height - paragraphHeight - overflowBBox.y) / 2) + ')');
		} else if(toBottom) {
			paragraph.attr('transform', 'translate(0, ' + (height - paragraphHeight - overflowBBox.y) + ')');
		}

		return super.update(duration, delay);
	}
}

export { Label };
