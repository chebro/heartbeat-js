const asciichart = require('asciichart');
const { hb } = require('../utils/constants.js');

let plot = new Array(60).fill(0);
let lock = false;

exports.updatePlot = () => {
	if (Date.now() - hb.lastBeat / 60000 > 1) lock = false;
	if (!lock) {
		plot = plot.concat(Array(Math.floor((Date.now() - hb.lastBeat) / 60000)).fill(0));
		plot = plot.concat([1]);
		if (plot.length > 60) plot.splice(0, plot.length - 60);
		lock = true;
	}
};

exports.getPlot = () => {
	let temp = plot.concat(Array(Math.floor((Date.now() - hb.lastBeat) / 60000)).fill(0));
	temp.splice(0, temp.length - 60);
	return asciichart
		.plot(temp, { height: 2 })
		.replaceAll(/[0-9]/g, '')
		.replaceAll('. ┼', '')
		.replaceAll('. ┤', '');
};
