module.exports = (recipes) => {
  console.log("THIS IS RECIPES", recipes);

  let arr = [1, 2, 3, 4, 5]

 return arr.map(Math.floor(Math.random() * recipes.length));

}
