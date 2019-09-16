//Routes to render each additional page
const mockdata = require("./../model/data/mockdata");
const queries = require("../model/queries/db_queries");
const api= ('../model/queries/apiCall');
const parse = require("url-parse");
// const api= ('../model/queries/apiCall');

exports.getHome = (req, res) => {
  res.render("home");
};

exports.getNewPlan = (req, res) => {
  res.render("newPlan", { recipes: mockdata });
};

exports.getMealPlans = (req, res) => {
  queries
    .getAllPlans()
    .then(result => {
      res.render("mealPlans", { mealPlan: result.rows });
    })
    .catch(err => {
      res.render("error", {
        statusCode: 500,
        errorMessage: "QUERY ERROR"
      });
    });
};

exports.getAdditionalChoices = (req, res) => {
  res.render("newplanAdditionalChoices", { recipes: mockdata });
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
        id: data[1].planID,
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
  queries
    .getShoppingList(req.params.id)
    .then(result => {
      res.render("shoppingList", { ingredients: result.rows });
    })
    .catch(err => {
      res.render("error", {
        statusCode: 500,
        errorMessage: "QUERY ERROR"
      });
    });
};

exports.getFiveRecipes = (req, res) => {
  
  api.getRecipesApi()
  .then(result => {
    res.render("newPlan", { recipes : result});
  })
  .catch(err => {
    res.render("error", {
      statusCode: 500,
      errorMessage: "QUERY ERROR"
    });
  });
}
