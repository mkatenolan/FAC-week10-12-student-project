//Routes to render each additional page 

exports.getNewPlan = (req, res) => {
  res.render('newPlan');
}

exports.getMealPlans = (req, res) => {
  res.render('mealplans')
}

exports.getAdditionalChoices = (req, res) => {
  res.render('newplan-additional-choices')
}
