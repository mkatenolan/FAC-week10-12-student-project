const fetch = require("node-fetch");
// const apiKey = process.env.API_KEY;
require("env2")("./.env");
const apiKey ='7c996292c3c54eee831feb9757f8b191'

const getRecipesApi = () => {
  const recipeUrl = `https://api.spoonacular.com/recipes/random?number=10&apiKey=${apiKey}`;
  // console.log('(apiCall) getRecipesApi (fetch) runs and input = ', recipeUrl);
  return fetch(recipeUrl)
    .then(data => data.json())
    .then(data => {
      let fiveRecipe = {};
      if (data.status === "failure") {
        fiveRecipe[0] = {};
        fiveRecipe[0].recipeName = "Our API has let us down, sorry";
      } else {
        for (let i = 0; i < data.recipes.length; i++) {
          fiveRecipe[i] = {};
          fiveRecipe[i].id = data.recipes[i].id;
          fiveRecipe[i].recipeName = data.recipes[i].title;
          fiveRecipe[i].cookingTime = data.recipes[i].cookingMinutes;
          fiveRecipe[i].healthScore = data.recipes[i].healthScore;
          fiveRecipe[i].imageUrl = data.recipes[i].image;
        }
      }
      return fiveRecipe;
    })
    .catch(err => console.log(err));
};

const getIngredientsApi = (idOne, idTwo) => {
  const url = `https://api.spoonacular.com/recipes/informationBulk?ids=${idOne},${idTwo}&apiKey=${apiKey}`;
  // console.log('(apiCall) getIngredientsApi (fetch) runs and input = ', url);
  return fetch(url)
    .then(data => data.json())
    .then(data => {
      let perishables = [];
      data.forEach(recipe => {
        recipe.extendedIngredients.forEach(ingredient => {
          if (
            ingredient.aisle == "Milk, Eggs, Other Dairy" ||
            ingredient.aisle == "Produce"
          ) {
            perishables.push(ingredient.name);
          }
        });
      });
      return perishables;
    })
    .catch(err => console.log(err));
};

const getSimilarsApi = arr => {
  const ingredientsUrl = arr
    .join(",")
    .split(" ")
    .join("+");
  const url = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredientsUrl}&number=5&ranking=2&apiKey=${apiKey}`;
  //console.log('(apiCall) getSimilarsApi (fetch) runs and input = ', url);
  return fetch(url)
    .then(data => data.json())
    .then(data => {
      let fiveMore = {};
      for (let i = 0; i < data.length; i++) {
        fiveMore[i] = {};
        fiveMore[i].id = data[i].id;
        fiveMore[i].recipeName = data[i].title;
        //fiveMore[i].cookingTime = data[i].cookingMinutes;
        //fiveMore[i].healthScore = data[i].healthScore;
        fiveMore[i].imageUrl = data[i].image;
      }
      //console.log({ fiveMore });
      return fiveMore;
    })
    .catch(err => console.log(err));
};

const getRecipesBulkApi = async idString => {
  const url = `https://api.spoonacular.com/recipes/informationBulk?ids=${idString}&apiKey=${apiKey}`;
  try {
    let response = await fetch(url);
    let json = await response.json();
    let recipeDetails = {};
    for (let i = 0; i < json.length; i++) {
      recipeDetails[i] = {};
      recipeDetails[i].id = json[i].id;
      recipeDetails[i].recipeName = json[i].title;
      if (json[i].cookingMinutes === undefined)
        recipeDetails[i].cookingTime = 0;
      else {
        recipeDetails[i].cookingTime = json[i].cookingMinutes;
      }
      recipeDetails[i].healthScore = json[i].healthScore;
      recipeDetails[i].instructions = json[i].instructions;
      recipeDetails[i].extendedIngredients = json[i].extendedIngredients;
      recipeDetails[i].imageUrl = json[i].image;
    }
    return recipeDetails;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getRecipesApi,
  getIngredientsApi,
  getSimilarsApi,
  getRecipesBulkApi
};
