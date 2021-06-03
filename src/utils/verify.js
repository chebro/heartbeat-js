const path = require('path');
const fs = require('fs');

module.exports = (req, res, next) => {
	fs.readFile(path.join(__dirname, '../token'), 'utf-8', (err, data) => {
		if (err) throw err;
		if (data === req.headers.auth) {
			next();
		} else {
			console.log(
				`${new Date().toLocaleString('en-GB')} - Incorrect token from ${req.ipReal} - ${
					req.headers.auth
				}`
			);
			res.status(401).json({
				status: 'fail',
				message: 'Invalid Credential',
			});
		}
	});
};
