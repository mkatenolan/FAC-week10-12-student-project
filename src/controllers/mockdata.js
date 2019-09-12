const mockdata = require('./../model/data/mockdata');

exports.get = (req, res) => {
  res.render ('mockdata', { activePage: {mockdata: true}, mockdata});
};
