const db = require('../model/dbModel');

const clientsControllers = {};

clientsControllers.getExersices = (req, res, next) => {
  const { ssid } = req.cookies;
  const filterSSID = ssid.replace(/[^0-9]/g, '');
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
        `SELECT wp.plan_duration, wp.frequency, wp.exercise_id, wp.notes, e.name 
                FROM workout_plan wp 
                JOIN clients c
                ON c.client_id=wp.client_id
                JOIN exercises e
            ON e.exercise_id=wp.exercise_id
                    WHERE (c.client_id=$1) AND (wp.exercise_id=e.exercise_id);`,
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
