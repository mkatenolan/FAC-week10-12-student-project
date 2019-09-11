const connection = require('./../database/db_connection');

//query for displaying all meal plans

const getAllPlans = () => {
  return connection.query('SELECT * FROM plans;');
};

//query for disaplying single plan

const getSinglePlan = (planId) => {
 return connection.query('SELECT * FROM plans WHERE id = planId;');
};

// query for displaying individual recipe info on meal plans page

const getRecipe = (planId) => {
  return connection.query('SELECT * FROM recipes INNER JOIN junction_plans_recipes ON recipes.id = junction_plans_recipes.recipe_id WHERE plan_id = planId;')
};

//query for getting ingredients for individual recipes
