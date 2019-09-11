const express = require('express');
const router = express.Router();

const home = require('./home');
// const newPlan = require('./newplan');
const error = require('./error');
// const mealPlans = require('./mealplans');
// const additionalChoices = require('./additional-choices');
const routes = require('./routes.js')
console.log('this is the routes object',routes);

router.get('/', home.get);
router.get('/newplan', routes.getNewPlan);
router.get('/mealplans', routes.getMealPlans);
router.get('/newplan-additional-choices', routes.getAdditionalChoices);
router.use(error.client);
router.use(error.server);

module.exports = router;
