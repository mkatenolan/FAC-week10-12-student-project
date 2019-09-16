const express = require("express");
const router = express.Router();
const error = require("./error");
const routes = require("./routes.js");
const email = require('./email.js');


router.get("/", routes.getHome);
router.get("/newplan", routes.getNewPlan);
router.get("/mealplans", routes.getMealPlans);
router.get("/newplan-additional-choices", routes.getAdditionalChoices);
router.get("/unique-meal-plan/:id/", routes.uniqueMealPlan);
router.get("/shopping-list/:id/", routes.shoppingList);
router.get("/unique-recipe/:id/", routes.individualRecipe);
router.get("/sendEmail", email.post);
router.use(error.client);
router.use(error.server);

module.exports = router;
