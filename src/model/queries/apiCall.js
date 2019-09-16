// const recipeUrl = "https://api.spoonacular.com/recipes/random?number=5&apiKey=fa31546b9db54de4ac0d528cc21fb947";
const fetch = require('node-fetch');

const getRecipesApi = () => {
  const recipeUrl = "https://api.spoonacular.com/recipes/random?number=5&apiKey=fa31546b9db54de4ac0d528cc21fb947";
    console.log('(apiCall) getRecipesApi (fetch) runs and input = ', recipeUrl);
    let fiveRecipe = {};
    fetch(recipeUrl)
      .then(data => data.json())
      .then(data =>{ 
          for (let i=0; i < data.recipes.length; i++) {
              fiveRecipe[i] = {};
              fiveRecipe[i].recipeName=  data.recipes[i].title
              fiveRecipe[i].cookingTime= data.recipes[i].cookingMinutes
              fiveRecipe[i].healthScore= data.recipes[i].healthScore
              fiveRecipe[i].imageUrl= data.recipes[i].image

          }
          return fiveRecipe;
        })
      .catch(err => console.log(err))

    
    //  console.log(fiveRecipe),
    // return fiveRecipe;
};

module.exports = {getRecipesApi};


