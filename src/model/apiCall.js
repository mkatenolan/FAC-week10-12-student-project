const recipeUrl = "https://api.spoonacular.com/recipes/random?number=5&apiKey=fa31546b9db54de4ac0d528cc21fb947";
const fetch = require('node-fetch');

const getRecipesApi = (url) => {
    console.log('(apiCall) getRecipesApi (fetch) runs and input = ', url);
    let fiveRecipe = {};
    fetch(url)
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
    .then(console.log)
      .catch(err => console.log(err))

    
    //  console.log(fiveRecipe),
    // return fiveRecipe;
};


getRecipesApi(recipeUrl);

