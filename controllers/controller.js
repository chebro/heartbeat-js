const fs = require('fs');
const path = require('path');

const hbPath = path.join(__dirname, '../hb.json'); 
const ver = require('child_process')
	.execSync('git rev-parse --short HEAD')
	.toString()
	.trim();

/* Create hb.json if missing */
if (!fs.existsSync(hbPath)) {
	fs.writeFileSync(hbPath, JSON.stringify({
		lastBeat: Date.now(),
		longestDiff: 0
	}));
}

const hb = require(hbPath);

const epochToDateString = msec => {
	/* Returns a formatted date time string from epoch time */
	let hr = Math.floor(msec / 3600000)
		.toLocaleString([], {minimumIntegerDigits: 2, useGrouping:false});
	let min = (Math.floor(msec / 60000) - 60 * hr)
		.toLocaleString([], {minimumIntegerDigits: 2, useGrouping:false});
	let sec = (Math.floor(msec / 1000) % 60)
		.toLocaleString([], {minimumIntegerDigits: 2, useGrouping:false});

	return `${hr}h ${min}m ${sec}s`;
};

exports.getHeartBeat = (req, res) => {
	let relDiffStr = epochToDateString(Date.now() - hb.lastBeat);
	let lonDiffStr = epochToDateString(hb.longestDiff);

	let lastBeatStr = 
	`${new Date(hb.lastBeat).toLocaleTimeString([], {
		hour: '2-digit', minute: '2-digit', second: '2-digit'
	})} ` + 
	`${new Date(hb.lastBeat).toLocaleDateString([],{
		day: '2-digit',	month: '2-digit', year: '2-digit' 
	})}`;

	res
		.status(200)
		.render('index', { 
			lastBeatStr,
			relDiffStr,
			lonDiffStr,
			ver
		});
};

exports.postHeartBeat = (req, res) => {
	/* TODO: Auth verification 
	if(req.pass != process.env.PASS) {
		res
			.status(403)
			.json({
				status: 'fail',
				reason: 'unauthorized'
			})
	}
	*/
	
	let beatDiff = Date.now() - hb.lastBeat;
	
	if(beatDiff > hb.longestDiff) {
		hb.longestDiff = beatDiff;
	}
	
	hb.lastBeat = Date.now();

	/* On successful beat, update hb.json */
	fs.writeFile(
		path.join(__dirname, '../hb.json'),
		JSON.stringify(hb),	err => {
			if (err) throw err;
		});	
	
	console.log(`${new Date().toLocaleString('en-GB')} - Successful beat from ${req.ip}`);
	
	res
		.status(200)
		.json({ 
			status: 'success',
			data: {
				recievedAt: new Date().toLocaleString('en-GB')
			}
		});
};

exports.getPrivacyPol = (req, res) => {
	res
		.status(200)
		.render('privacy', { ver });
};

