const router = require('express').Router();
const verify = require('../utils/verify.js');
const statsController = require('../controllers/statsController.js');

/* Routing middleware */
router
	.route('/:device') /* laptop, mobile */
	//.get(verify, statsController.getDeviceStats);
	.get(statsController.getDeviceStats);

router.route('/sleep').get(verify, statsController.getSleepStats);

module.exports = router;
