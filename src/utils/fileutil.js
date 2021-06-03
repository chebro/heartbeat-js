const fs = require('fs');
const hbPath = require('path').join(__dirname, '../hb.json');

exports.createHb = () => {
	if (!fs.existsSync(hbPath)) {
		fs.writeFileSync(
			hbPath,
			JSON.stringify({
				lastBeat: Date.now(),
				longestDiff: 0,
			})
		);
	}
};

exports.updateHb = hb => {
	fs.writeFile(hbPath, JSON.stringify(hb), err => {
		if (err) throw err;
	});
};
