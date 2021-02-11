const db = require('../model/dbModel');

const clientsControllers = {};

clientsControllers.getExersices = (req, res, next) => {
  const { ssid } = req.cookies;
  const filterSSID = ssid.replace(/[^0-9]/g, '');
  console.log('filter ssid>>>>', filterSSID);
  const param = [filterSSID];
  db.query(
    `SELECT
        trainers.first_name AS trainerFirstName, trainers.last_name AS trainerLastName,
        wp.plan_duration, wp.frequency, wp.exercise_id, wp.notes,
        c.first_name, c.last_name, c.age, c.weight, c.height, c.gender, c.client_id 
        FROM clients c
        JOIN trainers
        ON c.trainer_id=trainers.trainer_id 
        JOIN workout_plan wp
        ON c.client_id=wp.client_id
        WHERE (c.client_id=$1);`,
    param
  )
    .then((data) => {
      res.locals.dashboard = data.rows[0];
      console.log('res locals dashboard', res.locals.dashboard);
      return next();
    })
    .catch((err) => next({ err }));
};

module.exports = clientsControllers;
