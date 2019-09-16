// const recipeUrl = "https://api.spoonacular.com/recipes/random?number=5&apiKey=fa31546b9db54de4ac0d528cc21fb947";
const fetch = require('node-fetch');
const apiKey = 'ac1e1c1767144e209bd7a0c6b23e1fbd' //  fa31546b9db54de4ac0d528cc21fb947

const getRecipesApi = () => {
  const recipeUrl = `https://api.spoonacular.com/recipes/random?number=5&apiKey=${apiKey}`;
    // console.log('(apiCall) getRecipesApi (fetch) runs and input = ', recipeUrl);
    return fetch(recipeUrl)
      .then(data => data.json())
      .then(data => {
          let fiveRecipe = {};
          for (let i=0; i < data.recipes.length; i++) {
              fiveRecipe[i] = {};
              fiveRecipe[i].id =  data.recipes[i].id;
              fiveRecipe[i].recipeName =  data.recipes[i].title;
              fiveRecipe[i].cookingTime = data.recipes[i].cookingMinutes;
              fiveRecipe[i].healthScore = data.recipes[i].healthScore;
              fiveRecipe[i].imageUrl = data.recipes[i].image;
          }
          return fiveRecipe;
        })
      .catch(err => console.log(err))
};

const getIngredientsApi = (idOne, idTwo) => {
  const url = `https://api.spoonacular.com/recipes/informationBulk?ids=${idOne},${idTwo}&apiKey=${apiKey}`;
    // console.log('(apiCall) getIngredientsApi (fetch) runs and input = ', url);
    return fetch(url)
      .then(data => data.json())
      .then(data => {
        let perishables = [];
        data.forEach((recipe) => {
          recipe.extendedIngredients.forEach((ingredient) => {
            if (ingredient.aisle == "Milk, Eggs, Other Dairy" || ingredient.aisle == "Produce") {
              perishables.push(ingredient.name)
            }
          })
        })
          return perishables;
        })
      .catch(err => console.log(err))
};

const getSimilarsApi = (arr) => {
  const ingredientsUrl = arr.join(',').split(' ').join('+');
  const url = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredientsUrl}&number=5&ranking=2&apiKey=${apiKey}`
    // console.log('(apiCall) getSimilarsApi (fetch) runs and input = ', url);
    return fetch(url)
      .then(data => data.json())
      .then(data => {
        let fiveMore = {};
        for (let i=0; i < data.length; i++) {
            fiveMore[i] = {};
            fiveMore[i].id =  data[i].id;
            fiveMore[i].recipeName =  data[i].title;
            // fiveMore[i].cookingTime = data[i].cookingMinutes;
            // fiveMore[i].healthScore = data[i].healthScore;
            fiveMore[i].imageUrl = data[i].image;
        }
        return fiveMore;
      })
      .catch(err => console.log(err))

}

// For tests only
// const ingredients = [
//     'baby potatoes',   'fresh rosemary',
//     'fresh thyme',     'garlic',
//     'juice of lemon',  'rutabaga',
//     'sage',            'brussel sprouts',
//     'carrots',         'cauliflower',
//     'delicata squash', 'lacinato kale',
//     'parsnips',        'shallot',
//     'yam'
//   ]
// getSimilarsApi(ingredients);

module.exports = {
  getRecipesApi,
  getIngredientsApi,
  getSimilarsApi
};
