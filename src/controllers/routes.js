//Routes to render each additional page

const queries = require("../model/queries/db_queries");
console.log(queries.getRandomRecipes());

exports.getNewPlan = (req, res) => {
  queries
    .getRandomRecipes()
    .then(result => {
      res.render("newPlan", { recipe: result.rows });
    })
    .catch(err => {
      res.render("error", {
        statusCode: 500,
        errorMessage: "QUERY ERROR"
      });
    });
};

exports.getMealPlans = (req, res) => {
  res.render("mealplans");
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
