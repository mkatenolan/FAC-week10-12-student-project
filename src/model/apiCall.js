const recipeUrl = "https://api.spoonacular.com/recipes/random?number=5&apiKey=fa31546b9db54de4ac0d528cc21fb947";
const fetch = require('node-fetch');

const getRecipesApi = (url) => {
    console.log('(apiCall) getRecipesApi (fetch) runs and input = ', url);
    fetch(url)
      .then(data => data.json())
      .then(data => {
          console.log(data)
        })
      .catch(err => console.log(err))

};

getRecipesApi(recipeUrl);

