//Routes to render each additional page

const queries = require("../model/queries/db_queries");
const parse = require("url-parse")

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
  queries.getSinglePlan(req.params.id)
  .then(result =>
    res.render("uniqueMealPlan", {header: result.rows[0]})
  )
  .catch(err => {
    res.render("error", {
      statusCode: 500,
      errorMessage: "QUERY ERROR"
    });
  });

};

exports.shoppingList = (req, res) => {
  res.render("shoppingList");
};
