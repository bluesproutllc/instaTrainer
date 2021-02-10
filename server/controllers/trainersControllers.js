const db = require('../model/dbModel');

const trainersControllers = {};

trainersControllers.assignWorkout = (req, res, next) =>{

}
trainersControllers.getClients = (req, res, next) => {
    const {ssid} = req.cookies;
    const param = [ssid[ssid.length - 1]];
    db.query(`SELECT * FROM clients WHERE (trainer_id = $1);`,param)
    .then(data => {
        res.locals.clients = data.rows;
        return next()
    })
    .catch(err => next({err}))
}
module.exports = trainersControllers;