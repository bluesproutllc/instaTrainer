const db = require('../model/dbModel');

const trainersControllers = {};

trainersControllers.getClients = (req, res, next) => {
    const {ssid} = req.cookies;
    const trainerId = ssid.slice(7);
    const value = [trainerId];
    db.query(`SELECT * FROM clients WHERE (trainer_id = $1);`, value)
    .then(data => {
        res.locals.clients = data.rows;
        return next()
    })
    .catch(err => next({err}))
}
trainersControllers.getProfile = (req, res, next) => {
    const {client_id} = req.params;
    const param = [client_id]

    db.query(
      `SELECT
          c.first_name, c.last_name, c.age, c.weight, c.height, c.gender, c.client_id
          FROM clients c
          JOIN trainers
          ON c.trainer_id=trainers.trainer_id
          WHERE (c.client_id=$1);`,
      param
    )
      .then((data) => {
        res.locals.profile = data.rows[0];
        db.query(`SELECT wp.plan_duration, wp.frequency, wp.exercise_id, wp.notes, e.image_url, e.name,
        c.client_id
             FROM clients c
             JOIN workout_plan wp
             ON c.client_id=wp.client_id
             JOIN exercises e
            ON e.exercise_id=wp.exercise_id
                    WHERE (c.client_id=$1) AND (wp.exercise_id=e.exercise_id);`, param)
        .then(data => {
          if (data.rows.length === 0) {
            res.locals.workout = 'no plan';
            return next()
          } else {
            res.locals.workout = data.rows;
            return next()
          }
        }).catch(err => next({err}))
      })
      .catch((err) => next({ err }));  
}
trainersControllers.getExercises = (req, res, next) => {
    db.query(`SELECT * FROM exercises`)
      .then((data) => {
        res.locals.exercises = data.rows;
        return next();
      })
      .catch((err) => next({ err }));
}
trainersControllers.createPlan = (req, res, next) => {
    const {plan_duration, frequency, client_id, exercise_id, notes } = req.body;
    const param = [plan_duration, exercise_id, client_id, frequency, notes];
    db.query(`SELECT * FROM workout_plan WHERE (client_id=$1) AND (exercise_id=$2);`, [client_id, exercise_id])
    .then(data => {
        if (data.rows.length) {
            res.locals.status = 'existing plan';
            return next();
        } else {
             db.query(
               `INSERT INTO workout_plan (plan_duration, exercise_id, client_id, frequency, notes) values ($1, $2, $3, $4, $5) RETURNING plan_duration, exercise_id, client_id, frequency, notes;`,
               param
             ).then((data) => {
               res.locals.plan = data.rows[0];
               return next();
             });
        }
    })
        .catch(err => next({err}));
}
trainersControllers.editPlan = (req, res, next) => {
  const { plan_duration, frequency, client_id, exercise_id, notes } = req.body;
  const param = [plan_duration, frequency, notes, exercise_id, client_id];
  db.query(
    `update workout_plan set (plan_duration, frequency, notes) = ($1, $2, $3) where (client_id=$5) and (exercise_id=$4) returning plan_duration, frequency, notes, client_id, exercise_id`,
    param
  )
    .then((data) => {
      res.locals.newPlan = data.rows[0];
      return next();
    })
    .catch((err) => next({ err }));
};

trainersControllers.deletePlan = (req, res, next) => {
    const {client_id, exercise_id} = req.body;
    const param = [client_id, exercise_id];
    db.query(`DELETE FROM workout_plan WHERE (client_id=$1) and (exercise_id=$2);`, param)
    .then(data => next())
    .catch(err => next({err}))
}

module.exports = trainersControllers;