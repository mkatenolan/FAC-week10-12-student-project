//Routes to render each additional page
const mockdata = require("./../model/data/mockdata");
const queries = require("../model/queries/db_queries");
const api = require("../model/queries/apiCall");
const parse = require("url-parse");
// const email = require('./email');
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

let data = {};


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
  console.log("we are in the router function");

  let id = parseInt(req.params.id, 10);
  console.log("this is id", id);
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
        console.log("this is data", data[1].ingredients.rows);
      res.render("individualRecipe", { recipeOverview: data[1].recipeOverview.rows, ingredients: data[1].ingredients.rows });
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
    // .then(console.log)
    .then(result => {
      res.render("newPlan", { recipes : result });
    })
    .catch(err => {
      res.render("error", {
        statusCode: 500,
        errorMessage: "API ERROR"
      });
    });
}

const mailhbs = require("nodemailer-express-handlebars");
const nodemailer = require("nodemailer");
// const routes = require('./routes');
// let data = routes.data;
require("env2")("./.env");

exports.email = (req, res) => {
  console.log("we are in the post function");
  console.log('this is the page data', data);
  console.log('this is the request from the user', req);
  let email = "antl.lomax@gmail.com";
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
  //using sendgrid as transport, but can use any transport.
  let send_grid = {
    service: "SendGrid",
    auth: {
      api_key: process.env.SEND_GRID_API_KEY
    }
  };
  let mailer = nodemailer.createTransport(sgTransport(send_grid));
  mailer.use("compile", mailhbs(options));
  mailer.sendMail(
    {
      from: "mkatenolan@gmail.com",
      to: email,
      subject: "Any Subject",
      template: "email_body",
      context: {
        test: "THIS WORKSSSS",
        // plan_name: data[1].meta.rows.plan_name,
        // plan_days: data[1].meta.rows.plan_days
      }
    },
    (error, response) => {
      if (error) console.log(error);
      else console.log(response, "mail sent to ");

      mailer.close();
    }
  );
};


// module.exports = data
