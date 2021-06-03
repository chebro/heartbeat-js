const router = require('express').Router();
const verify = require('../utils/verify.js');
const mainController = require('../controllers/mainController.js');

/* Routing middleware */
router.route('/').post(verify, mainController.postHeartBeat).get(mainController.getHeartBeat);

router.route('/privacy').get(mainController.getPrivacyPol);

module.exports = router;
