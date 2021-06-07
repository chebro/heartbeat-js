module.exports = (req, res, next) => {
	if (process.env.AUTH === req.headers.auth) {
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
};
