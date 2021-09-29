const { hb, version } = require('../utils/constants.js');
const { updatePlot } = require('../utils/plotutil.js');
const { updateHb } = require('../utils/fileutil.js');
const { formattedTimeString, epochToDateTimeString } = require('../utils/timeutil.js');

exports.getHeartBeat = (_req, res) => {
	res.status(200).render('index', {
		lastBeatStr: epochToDateTimeString(hb.lastBeat),
		relDiffStr: formattedTimeString(Date.now() - hb.lastBeat),
		lonDiffStr: formattedTimeString(hb.longestDiff),
		version,
	});
};

exports.getPrivacyPol = (_req, res) => {
	res.status(200).render('privacy', { version });
};

exports.postHeartBeat = (req, res) => {
	updatePlot();

	let beatDiff = Date.now() - hb.lastBeat;
	if (beatDiff > hb.longestDiff) hb.longestDiff = beatDiff;
	hb.lastBeat = Date.now();

	updateHb(hb);
	console.log(`${new Date().toLocaleString('en-GB')} - Successful beat from ${req.ip}`);

	res.status(200).json({
		status: 'success',
		data: {
			timestamp: new Date().toLocaleString('en-GB'),
		},
	});
};
