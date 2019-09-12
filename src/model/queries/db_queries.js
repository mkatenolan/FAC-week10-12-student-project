const connection = require("./../database/db_connection");

// Query for displaying all meal plans

const getAllPlans = () => {
  return connection.query(`SELECT * FROM plans;`);
};

// Query for disaplying single plan

const getSinglePlan = planId => {
  return connection.query(`SELECT * FROM plans WHERE id = {planId};`);
};

// Query for displaying recipe info on meal plans page - query returns all recipes related to the given meal plan

const getRecipes = planId => {
  return connection.query(
    `SELECT * FROM recipes INNER JOIN junction_plans_recipes ON recipes.id = junction_plans_recipes.recipe_id WHERE plan_id = {planId};`
  );
};

// Query for displaying recipe info on single recipe page

const getSingleRecipe = recipeId => {
  return connection.query(
    `SELECT * FROM recipes WHERE recipe_id = {recipeId};`
  );
};

// Query for getting ingredients for individual recipes

const getIngredients = recipeId => {
  return connection.query(
    `SELECT ingredient_name FROM ingredients INNER JOIN junction_recipes_ingredients ON ingredients.id = junction_recipes_ingredients.ingredient_id WHERE recipe_id = {recipeId};`
  );
};

// Query for getting shopping list for a specific meal plan

const getShoppingList = planId => {
  return connection.query(
    `SELECT ingredient_name FROM ingredients INNER JOIN junction_recipes_ingredients ON ingredients.id = junction_recipes_ingredients.ingredient_id INNER JOIN junction_plans_recipes ON junction_plans_recipes.recipe_id = junction_recipes_ingredients.recipe_id WHERE plan_id = {planId};`
  );
};

// Query for getting all recipes in random order (only five to be displayed initially)

const getRandomRecipes = () => {
  return connection.query(
    `SELECT recipe_name, cooking_time FROM recipes ORDER BY RANDOM();`
  );
};

// Query for getting additional suggestions with shared getIngredients

const getSimilarRecipes = (firstPick, secondPick) => {
  return connection.query(
    `SELECT recipe_name, cooking_time, health_score FROM recipes WHERE id IN (SELECT DISTINCT recipe_id FROM junction_recipes_ingredients WHERE ingredient_id IN (SELECT ingredient_id FROM junction_recipes_ingredients WHERE recipe_id = {firstPick} OR recipe_id = {secondPick}));`
  );
};

// Query for adding a new plan - title and days - into 'plans' table

const addNewPlan = (planName, planDays) => {
  return connection.query(
    "INSERT INTO plans (id, plan_name, plan_days) VALUES (id, planName, planDays);"
  );
};

// Query for adding a recipe to a plan in junction table

const addRecipeToPlan = (planId, recipeId) => {
  return connection.query(
    `INSERT INTO junction_plans_recipes (plan_id, recipe_id) VALUES ({planId}, {recipeId})`
  );
};

module.exports = {
  getAllPlans,
  getSinglePlan,
  getRecipes,
  getSingleRecipe,
  getIngredients,
  getShoppingList,
  getRandomRecipes,
  getSimilarRecipes,
  addNewPlan,
  addRecipeToPlan
};
