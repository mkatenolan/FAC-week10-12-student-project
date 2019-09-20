//Routes to render each additional page
const mockdata = require("./../model/data/mockdata");
const queries = require("../model/queries/db_queries");
const api = require("../model/queries/apiCall");
const parse = require("url-parse");
const mailhbs = require("nodemailer-express-handlebars");
const nodemailer = require("nodemailer");
require("env2")("./.env");

let data = {};

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
  const recipes = {
    one: req.cookies.recipes.split("+")[1],
    two: req.cookies.recipes.split("+")[2]
  };
  api
    .getIngredientsApi(recipes.one, recipes.two)
    .then(ingredients => api.getSimilarsApi(ingredients))
    .then(result => {
      res.render("newplanAdditionalChoices", { recipes: result });
    })
    .catch(err => {
      res.render("error", {
        statusCode: 500,
        errorMessage: "API ERROR"
      });
    });
};

// Route to make call to DB to get info for individual meal plan overview

exports.uniqueMealPlan = (req, res) => {
  data.planID = req.params.id;

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

//route to make a db call to get info about each individual recipe

exports.individualRecipe = (req, res) => {
  let id = parseInt(req.params.id, 10);
  // console.log("this is id", id);
  let data = {};
  let p1 = queries.getIngredients(id).then(result => {
    data.ingredients = result;
  });

  let p2 = queries.getSingleRecipe(id).then(result => {
    data.recipeOverview = result;
    return data;
  });

  Promise.all([p1, p2])
    .then(data => {
      //console.log("this is data", data[1].ingredients.rows);
      res.render("individualRecipe", {
        recipeOverview: data[1].recipeOverview.rows,
        ingredients: data[1].ingredients.rows
      });
    })
    .catch(err => {
      res.render("error", {
        statusCode: 500,
        errorMessage: "QUERY ERROR"
      });
    });
};

// route to make a db call for shopping list page

exports.shoppingList = (req, res) => {
  let ingredientsArray = [];
  let ingredientsObject = {};
  let uniqueIngredients = [];
  let duplicateIngredients = [];
  queries
    .getShoppingList(req.params.id)
    .then(result => {
      result.rows.forEach(e => {
        ingredientsArray.push(e.ingredient_name);
      });
      return ingredientsArray;
    })
    .then(ingredientsArray => {
      ingredientsArray.forEach(e => {
        if (Object.keys(ingredientsObject).includes(e)) {
          ingredientsObject[e] = true;
        } else {
          ingredientsObject[e] = false;
        }
      });
      return ingredientsObject;
    })
    .then(ingredientsObject => {
      Object.entries(ingredientsObject).forEach((e, i) => {
        if (e.includes(true)) {
          duplicateIngredients.push(e[0]);
        } else {
          uniqueIngredients.push(e[0]);
        }
      });
    })
    .then(ingredientsObject => {
      res.render("shoppingList", {
        uniqueIngredients: uniqueIngredients,
        duplicateIngredients: duplicateIngredients
      });
    })
    .catch(err => {
      res.render("error", {
        statusCode: 500,
        errorMessage: "QUERY ERROR"
      });
    });
};

exports.getFiveRecipes = (req, res) => {
  api
    .getRecipesApi()
    .then(result => {
      res.render("newPlan", { recipes: result });
    })
    .catch(err => {
      res.render("error", {
        statusCode: 500,
        errorMessage: "API ERROR"
      });
    });
};

exports.email = (req, res) => {
  let parsedReq = JSON.parse(req);
  let url = parsedReq.url;
  let email = parsedReq.email;
  let options = {
    viewEngine: {
      extname: ".hbs",
      layoutsDir: "src/views/email",
      defaultLayout: "template",
      partialsDir: "views/partials/"
    },
    viewPath: "src/views/email",
    extName: ".hbs"
  };
  let sgTransport = require("nodemailer-sendgrid-transport");
  let send_grid = {
    service: "SendGrid",
    auth: {
      api_key:  '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' //process.env.SEND_GRID_API_KEY
    }
  };
  let mailer = nodemailer.createTransport(sgTransport(send_grid));
  mailer.use("compile", mailhbs(options));
  mailer.sendMail(
    {
      from: "nomnomfac@gmail.com",
      to: email,
      subject: "Your NomNom meal plan",
      template: "email_body",
      context: {
        plan_name: data.meta.rows[0].plan_name,
        plan_days: data.meta.rows[0].plan_days,
        plan_url: url
      }
    },
    (error, response) => {
      if (error) console.log(error);
      else console.log(response, "mail sent to", email);
      mailer.close();
    }
  );
};

exports.confirmPlan = (req, data) => {
  let planName = JSON.parse(data).planName;
  let ids = req.cookies.recipes;
  let recipeIdsArr = ids.split("+");
  recipeIdsArr.shift();
  let recipeIds = recipeIdsArr.join(",");
  api
    .getRecipesBulkApi(recipeIds)
    .then(mealPlanOb => {
      mealPlanOb.plan_name = planName;
      mealPlanOb.plan_days = recipeIdsArr.length;
      return mealPlanOb;
    })
    .then(mealPlanOb => {
      queries.addPlanToDatabase(mealPlanOb);
      return mealPlanOb;
    });
};
