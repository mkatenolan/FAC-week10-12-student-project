const express = require('express');
const router = express.Router();

const home = require('./home');
const newPlan = require('./newplan');
const error = require('./error');
const mealPlans = require('./mealplans');

router.get('/', home.get);
router.get('/newplan', newPlan.get);
router.get('/mealplans', mealPlans.get)
router.use(error.client);
router.use(error.server);

module.exports = router;
