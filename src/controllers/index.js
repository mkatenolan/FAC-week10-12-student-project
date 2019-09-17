const express = require("express");
const router = express.Router();
const error = require("./error");
const routes = require("./routes.js");

const dataStreamer = (req, cb) => {
  let allData = "";
  req.on("data", chunk => {
    allData += chunk;
  });
  req.on("end", () => {
    cb(allData);
  });
};

router.get("/", routes.getHome);
router.post("/submitmealplan", (req, res) => {
  dataStreamer(req, data => {
    console.log("this is the data", data);
    console.log("this is the request", req.cookies);
  });
});
router.get("/mealplans", routes.getMealPlans);
router.get("/newplan", routes.getFiveRecipes);
router.get("/newplan-additional-choices", routes.getAdditionalChoices);
router.get("/unique-meal-plan/:id/", routes.uniqueMealPlan);
router.get("/shopping-list/:id/", routes.shoppingList);
router.get("/unique-recipe/:id/", routes.individualRecipe);
router.post("/sendEmail", (req, res, next) => {
  dataStreamer(req, data => {
    routes.email(data, res);
  });
});
router.use(error.client);
router.use(error.server);

module.exports = router;
