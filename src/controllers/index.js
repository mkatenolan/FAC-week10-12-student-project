const express = require("express");
const router = express.Router();
const error = require("./error");
const routes = require("./routes.js");
const email = require("./email.js");
// const bodyParser = require("body-parser");
// const urlencodedParser = bodyParser.urlencoded({
//   extended: false
// });

router.get("/", routes.getHome);
router.get("/mealplans", routes.getMealPlans);
router.get("/newplan", routes.getFiveRecipes);
router.get("/newplan-additional-choices", routes.getAdditionalChoices);
router.get("/unique-meal-plan/:id/", routes.uniqueMealPlan);
router.get("/shopping-list/:id/", routes.shoppingList);
router.get("/unique-recipe/:id/", routes.individualRecipe);
router.post("/sendEmail", (req, res, next) => {
  console.log("we are in the index.js file");
  console.log("this is the reqeust body", req.body);
  email.post(req, res);
});
router.use(error.client);
router.use(error.server);

module.exports = router;
