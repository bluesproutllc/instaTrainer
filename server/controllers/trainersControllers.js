const db = require('../model/dbModel');

const trainersControllers = {};

trainersControllers.getClients = (req, res, next) => {
    const {ssid} = req.cookies;
    const trainerId = ssid.slice(7);
    console.log(trainerId)
    const value = [trainerId];
    db.query(`SELECT * FROM clients WHERE (trainer_id = $1);`, value)
    .then(data => {
        res.locals.clients = data.rows;
        return next()
    })
    .catch(err => next({err}))
}
trainersControllers.getProfile = (req, res, next) => {
    const {clientId} = req.params;
    const param = [clientId]
    db.query(`SELECT * FROM clients WHERE (client_id = $1);`, param) 
    .then(data => {
        res.locals.profile = data.rows[0]
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
module.exports = trainersControllers;