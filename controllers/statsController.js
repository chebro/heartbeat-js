const ver = require('child_process').execSync('git rev-parse --short HEAD').toString().trim();
const { getPlot } = require('../utils/plotutil.js');

exports.getDeviceStats = (req, res) => {
	// res.status(200).render('stats');
	res
		.status(200)
		//.send(getChart());
		.render('stats', { ver, graph: getPlot() });
};

exports.getSleepStats = (req, res) => {
	res.status(200).render('privacy');
};
