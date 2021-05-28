const fs = require('fs');
const path = require('path');
const { formattedTimeString, epochToDateTimeString } = require('../utils/timeutil.js');
const { updatePlot } = require('../utils/plotutil.js');

const hbPath = path.join(__dirname, '../hb.json');
const ver = require('child_process').execSync('git rev-parse --short HEAD').toString().trim();

/* Create hb.json if missing */
if (!fs.existsSync(hbPath)) {
	fs.writeFileSync(
		hbPath,
		JSON.stringify({
			lastBeat: Date.now(),
			longestDiff: 0,
		})
	);
}

const hb = require(hbPath);

exports.getHeartBeat = (req, res) => {
	let relDiffStr = formattedTimeString(Date.now() - hb.lastBeat);
	let lonDiffStr = formattedTimeString(hb.longestDiff);
	let lastBeatStr = epochToDateTimeString(hb.lastBeat);

	res.status(200).render('index', {
		lastBeatStr,
		relDiffStr,
		lonDiffStr,
		ver,
	});
};

exports.postHeartBeat = (req, res) => {
	//updatePlot(req.body.device);
	updatePlot();

	let beatDiff = Date.now() - hb.lastBeat;

	if (beatDiff > hb.longestDiff) {
		hb.longestDiff = beatDiff;
	}

	hb.lastBeat = Date.now();

	/* On successful beat, update hb.json */
	fs.writeFile(hbPath, JSON.stringify(hb), err => {
		if (err) throw err;
	});

	console.log(`${new Date().toLocaleString('en-GB')} - Successful beat from ${req.ipReal}`);

	res.status(200).json({
		status: 'success',
		data: {
			recievedAt: new Date().toLocaleString('en-GB'),
		},
	});
};

exports.getPrivacyPol = (req, res) => {
	res.status(200).render('privacy', { ver });
};
