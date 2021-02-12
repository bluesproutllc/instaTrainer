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
        c.first_name, c.last_name, c.age, c.weight, c.height, c.gender, c.client_id 
        FROM clients c
        JOIN trainers
        ON c.trainer_id=trainers.trainer_id 
        WHERE (c.client_id=$1);`,
    param
  )
    .then((data) => {
      res.locals.profile = data.rows[0];
      db.query(
        `SELECT wp.plan_duration, wp.frequency, wp.exercise_id, wp.notes 
                FROM workout_plan wp 
                JOIN clients 
                ON clients.client_id=wp.client_id
                WHERE (clients.client_id=$1);`,
        param
      )
        .then((data) => {
          if (data.rows.length === 0) {
            res.locals.workout = 'no plan';
            return next();
          } else {
            res.locals.workout = data.rows;
            return next();
          }
        })
        .catch((err) => next({ err }));
    })
    .catch((err) => next({ err }));
};

module.exports = clientsControllers;
