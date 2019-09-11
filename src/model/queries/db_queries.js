const connection = require('./../database/db_connection');

//query for displaying all meal plans

const getAllPlans = () => {
  return connection.query('SELECT * FROM plans;');
};


//query for disaplying single plan

const getSinglePlan = () => {
  return connection.query('')
}
