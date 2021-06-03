const { getPlot } = require('../utils/plotutil.js');
const { osname, version } = require('../utils/constants.js');
const exec = require('util').promisify(require('child_process').exec);

const uptime = () => {
	return exec('uptime -p | cut -d"," -f"1-3"');
};

exports.getDeviceStats = (req, res) => {
	try {
		uptime().then(data => {
			let uptime = data.stdout;
			res.status(200).render('stats', { version, osname, uptime, graph: getPlot() });
		});
	} catch (err) {
		console.log(err);
	}
};
