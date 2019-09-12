//Routes to render each additional page
const mockdata = require('./../model/data/mockdata');


exports.getNewPlan = (req, res) => {
  res.render("newPlan", {recipes: mockdata});
};

exports.getMealPlans = (req, res) => {
  res.render("mealplans");
};

exports.getAdditionalChoices = (req, res) => {
  res.render("newplan-additional-choices", {recipes: mockdata});
};

exports.uniqueMealPlan = (req, res) => {
  res.render("uniqueMealPlan");
};

exports.shoppingList = (req, res) => {
  res.render("shoppingList");
};
