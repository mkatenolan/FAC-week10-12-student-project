//Routes to render each additional page

const queries = require("../model/queries/db_queries");
console.log(queries.getRandomRecipes());

exports.getNewPlan = (req, res) => {
  res.render("newPlan");
};

exports.getMealPlans = (req, res) => {
  queries
    .getAllPlans()
    .then(result => {
      res.render("mealplans", { mealPlan: result.rows });
    })
    .catch(err => {
      res.render("error", {
        statusCode: 500,
        errorMessage: "QUERY ERROR"
      });
    });
};

exports.getAdditionalChoices = (req, res) => {
  res.render("newplan-additional-choices");
};

exports.uniqueMealPlan = (req, res) => {
  res.render("uniqueMealPlan");
};

exports.shoppingList = (req, res) => {
  res.render("shoppingList");
};
