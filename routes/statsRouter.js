const router = require('express').Router();
//const verify = require('../utils/verify.js');
const statsController = require('../controllers/statsController.js');

/* Routing middleware */
router
	//.route('/:device') /* laptop, mobile */
	.route('/')
	.get(statsController.getDeviceStats);

module.exports = router;
