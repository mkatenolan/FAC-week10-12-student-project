const connection = require('./../database/db_connection');

//query for displaying all meal plans

const getAllPlans = () => {
  return connection.query('SELECT * FROM plans;');
};


//query for disaplying single plan

const getSinglePlan = (plan_id) => {
  let data = {};

 data.name = connection.query('SELECT plan_name FROM plans WHERE id = plan_id;');
 data.days = connection.query('SELECT plan_days FROM plans WHERE id = plan_id;');
 data.time =

 return data;
}
