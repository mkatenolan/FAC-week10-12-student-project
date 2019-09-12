const mockdata = require('./../model/data/mockdata');

exports.get = (req, res) => {
  res.render('newPlan', {recipes: mockdata});
};
