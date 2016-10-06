describe('Bar', function() {
  describe('general options', function() {
    it('should return the specified options of the bar', function() {
		var x = 50,
			y = 0,
			height = 50,
			width = 800,
			value = 100,
			// fill = palette[0],
			svg = SVG(width + x, height + y, 'Bar: general options');
debugger;
		var bar = fluid3.bar(svg).attr({
				x: x,
				y: y,
				width: width,
				height: height,
				value: 0,
				towards: 'right'
			})
			.update()
			.attr('value', value)
			.update(1000);
// d3.select('body').append('p').text('blajdfnbaojdnf');
		// expect(x).toBe(x);

		// var a = 1;
		// expect(a).toBe(1);
		expect(bar.attr('y')).toBe(y);
		expect(bar.attr('width')).toBe(width);
		expect(bar.attr('height')).toBe(height);
		// expect(bar.attr('rect').attr.fill).toBe(fill);
    });
  });
});