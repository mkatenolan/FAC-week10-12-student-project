const express = require("express");
const router = express.Router();
const error = require("./error");
const routes = require("./routes.js");

router.get("/", routes.getHome);
router.get("/newplan", routes.getNewPlan);
router.get("/mealplans", routes.getMealPlans);
router.get("/newplan-additional-choices", routes.getAdditionalChoices);
router.get("/unique-meal-plan/:id/", routes.uniqueMealPlan);
router.get("/shopping-list/:id/", routes.shoppingList);
router.use(error.client);
router.use(error.server);

module.exports = router;
