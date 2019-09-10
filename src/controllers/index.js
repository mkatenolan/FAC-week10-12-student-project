const express = require('express');
const router = express.Router();

const home = require('./home');
const newPlan = require('./newPlan');
const error = require('./error');

router.get('/', home.get);
router.get('/newplan', newPlan.get);
router.use(error.client);
router.use(error.server);

module.exports = router;
