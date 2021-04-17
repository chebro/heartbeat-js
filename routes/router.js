const router = require('express').Router();
const verify = require('../utils/verify.js');
const Controller = require('../controllers/controller.js');

/* Routing middleware */
router
	.route('/')
	.get(Controller.getHeartBeat)
	.post(verify, Controller.postHeartBeat);

router
	.route('/privacy')
	.get(Controller.getPrivacyPol);

module.exports = router;
