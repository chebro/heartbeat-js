const asciichart = require('asciichart');
const hb = require(require('path').join(__dirname, '../hb.json'));

let plot = [0];

//exports.updatePlot = device => {
//console.log(device);
exports.updatePlot = () => {
	let diff = Math.floor((Date.now() - hb.lastBeat) / 60000);
	plot = plot.concat(Array(diff).fill(0));
	plot = plot.concat([1]);
	if (plot.length > 1) console.log(asciichart.plot(plot, { colors: [asciichart.blue] }));
	// TODO: set maximum plot length
	// if(plot.length > 100) // remove first element
};

exports.getPlot = () => {
	let diff = Math.floor((Date.now() - hb.lastBeat) / 60000);
	return asciichart.plot(plot.concat(Array(diff).fill(0)));
};
