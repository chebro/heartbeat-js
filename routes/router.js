const router = require('express').Router();
const Controller = require('../controllers/controller.js');

/* Routing middleware */
router
	.route('/')
	.get(Controller.getHeartBeat)
	.post(Controller.postHeartBeat);

router
	.route('/privacy')
	.get(Controller.getPrivacyPol);

module.exports = router;
