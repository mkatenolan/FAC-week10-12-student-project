//Routes to render each additional page

const queries = require("../model/queries/db_queries");
const parse = require("url-parse");

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
  let data = {
    planID: req.params.id
  };
  let p1 = queries.getSinglePlan(req.params.id).then(result => {
    data.meta = result;
  });
  let p2 = queries.getRecipes(req.params.id).then(result => {
    data.recipes = result;
    return data;
  });

  Promise.all([p1, p2])
    .then(data => {
      res.render("uniqueMealPlan", {
        id: data[1].planID
        header: data[1].meta.rows[0],
        meal_plan_recipe: data[1].recipes.rows
      });
    })
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
