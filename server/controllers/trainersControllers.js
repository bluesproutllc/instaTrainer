const db = require('../model/dbModel');

const trainersControllers = {};

trainersControllers.assignWorkout = (req, res, next) =>{

}
trainersControllers.getClients = (req, res, next) => {
    // const {ssid} = req.cookies;
    const {trainerId} = req.params;
    const value = [trainerId];
    db.query(`SELECT * FROM clients WHERE (trainer_id = $1);`, value)
    .then(data => {
        res.locals.clients = data.rows;
        return next()
    })
    .catch(err => next({err}))
}
module.exports = trainersControllers;