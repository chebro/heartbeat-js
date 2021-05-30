const { hb, version } = require('../utils/constants.js');
const { updatePlot } = require('../utils/plotutil.js');
const { createHb, updateHb } = require('../utils/fileutil.js');
const { formattedTimeString, epochToDateTimeString } = require('../utils/timeutil.js');

/* Create hb.json if missing */
createHb();

exports.getHeartBeat = (req, res) => {
	res.status(200).render('index', {
		lastBeatStr: formattedTimeString(Date.now() - hb.lastBeat),
		relDiffStr: formattedTimeString(hb.longestDiff),
		lonDiffStr: epochToDateTimeString(hb.lastBeat),
		version,
	});
};

exports.getPrivacyPol = (req, res) => {
	res.status(200).render('privacy', { version });
};

exports.postHeartBeat = (req, res) => {
	updatePlot();

	let beatDiff = Date.now() - hb.lastBeat;
	if (beatDiff > hb.longestDiff) hb.longestDiff = beatDiff;
	hb.lastBeat = Date.now();

	updateHb(hb);
	console.log(`${new Date().toLocaleString('en-GB')} - Successful beat from ${req.ipReal}`);

	res.status(200).json({
		status: 'success',
		data: {
			timestamp: new Date().toLocaleString('en-GB'),
		},
	});
};
