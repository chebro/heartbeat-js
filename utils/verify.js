const fs = require('fs');

module.exports = (req, res, next) => {
	fs.readFile('token', 'utf-8', (err, data) => {
		if (err) throw err;
		if (data === req.headers.auth) {
			next();
		} else {
			console.log(`${new Date().toLocaleString('en-GB')} - Incorrect token from ${req.ipReal}`);
			res.status(401).json({
				status: 'fail',
				message: 'Invalid Credential'
			});
		}
	});
};