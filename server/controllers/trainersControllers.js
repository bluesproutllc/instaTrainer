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
    db.query(`SELECT
        wp.plan_duration, wp.frequency, wp.exercise_id, wp.notes,
        c.first_name, c.last_name, c.age, c.weight, c.height, c.gender, c.client_id 
        FROM clients c
        JOIN workout_plan wp
        ON c.client_id=wp.client_id
        WHERE (c.client_id = $1);`, param) 
    .then(data => {
        res.locals.profile = data.rows;
        return next()
    })
    .catch(err => next({err}))
}
trainersControllers.getExercises = (req, res, next) => {
    db.query(`SELECT * FROM exercises`)
      .then((data) => {
        res.locals.exercises = data.rows;
        return next();
      })
      .catch((err) => next({ err }));
}
trainersControllers.deletePlan = (req, res, next) => {
    const {client_id, exercise_id} = req.body;
    const param = [client_id, exercise_id];
    db.query(`DELETE FROM workout_plan WHERE (client_id=$1) and (exercise_id=$2);`, param)
    .then(data => next())
    .catch(err => next({err}))
}
module.exports = trainersControllers;