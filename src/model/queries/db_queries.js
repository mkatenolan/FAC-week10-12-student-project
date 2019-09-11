const connection = require("./../database/db_connection");

//query for displaying all meal plans

const getAllPlans = () => {
  return connection.query("SELECT * FROM plans;");
};

//query for disaplying single plan

const getSinglePlan = planId => {
  return connection.query("SELECT * FROM plans WHERE id = {planId};");
};

// query for displaying recipe info on meal plans page - query returns all recipes related to the given meal plan

const getRecipes = planId => {
  return connection.query(
    "SELECT * FROM recipes INNER JOIN junction_plans_recipes ON recipes.id = junction_plans_recipes.recipe_id WHERE plan_id = {planId};"
  );
};

//query for displaying recipe info on single recipe page

const getSingleRecipe = recipeId => {
  return connection.query("SELECT * FROM recipes WHERE recipe_id = {recipeId};");
};

//query for getting ingredients for individual recipes

const getIngredients = recipeId => {
  return connection.query(
    "SELECT ingredient_name FROM ingredients INNER JOIN junction_recipes_ingredients ON ingredients.id = junction_recipes_ingredients.ingredient_id WHERE recipe_id = {recipeId};"
  );
};

// query for getting shopping list for a specific meal plan

const getShoppingList = planId => {
  return connection.query(
    "SELECT ingredient_name FROM ingredients INNER JOIN junction_recipes_ingredients ON ingredients.id = junction_recipes_ingredients.ingredient_id INNER JOIN junction_plans_recipes ON junction_plans_recipes.recipe_id = junction_recipes_ingredients.recipe_id WHERE plan_id = {planId};"
  );
};

// query for getting all recipes in random order (only five to be displayed initially)

const getRandomRecipes => {
  return connection.query(
    "SELECT recipe_name, cooking_time FROM recipes ORDER BY RANDOM();"
  );
};

// query for getting additional suggestions with shared getIngredients

const getSimilarRecipes = (firstPick, secondPick) => {
  return connection.query(
    "SELECT recipe_name, cooking_time, health_score FROM recipes WHERE id IN (SELECT DISTINCT recipe_id FROM junction_recipes_ingredients WHERE ingredient_id IN (SELECT ingredient_id FROM junction_recipes_ingredients WHERE recipe_id = {firstPick} OR recipe_id = {secondPick}));"
  );
};
