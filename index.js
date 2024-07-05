import '@g-js-api/g.js';
await $.exportConfig({
	type: 'savefile',
	options: {
		info: true
	}
});

let parse_color = (input_color) => {
	let spl = input_color.split('_');
	let result = {
		OBJ_ID: 899,
		DURATION: 0,
		X: 15
	};
	spl.forEach((property, i) => {
		if (!(i % 2)) {
			property = parseInt(property);
			let value = spl[i + 1];
			let int = parseInt(value);
			let float = parseFloat(value);
			let bool = !!int;
			switch (property) {
				case 1: // red
					result.TRIGGER_RED = int;
				break;
				case 2: // green
					result.TRIGGER_GREEN = int;
				break;
				case 3: // blue
					result.TRIGGER_BLUE = int;
				break;
				case 5: // blending
					result.BLENDING = bool;
				break;
				case 6: // color channel
					result.TARGET_COLOR = int;
				break;
				case 7: // opacity
					result.OPACITY = float;
				break;
			};
		};
	});
	return result;
};

let level_options = level.raw_levelstring.split(';').shift().split(',');
let colors = level_options[level_options.indexOf("kS38") + 1].split('|');
let y_off = 15;
colors.forEach((x, i) => {
	let clt = parse_color(x);
	if (clt.TARGET_COLOR < 1000) {
		clt.Y = y_off;
		clt.TARGET_COLOR = color(clt.TARGET_COLOR);
		object(clt).add();
		y_off += 30;
	};
});