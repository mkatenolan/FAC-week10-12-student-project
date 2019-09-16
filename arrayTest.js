const ingredients = [
    'baby potatoes',   'fresh rosemary',
    'fresh thyme',     'garlic',
    'juice of lemon',  'rutabaga',
    'sage',            'brussel sprouts',
    'carrots',         'cauliflower',
    'delicata squash', 'lacinato kale',
    'parsnips',        'shallot',
    'yam'
  ]

const testFunction = (arr) => {
  return arr.join(',').split(' ').join('+')
}
  // https://api.spoonacular.com/recipes/findByIngredients?ingredients=baby+potatoes,fresh+rosemary,fresh+thyme,garlic,juice+of+lemon,rutabaga,sage,brussel+sprouts,carrots,cauliflower,delicata+squash,lacinato+kale,parsnips,shallot,yam&number=5&apiKey=ac1e1c1767144e209bd7a0c6b23e1fbd

console.log(testFunction(ingredients));
