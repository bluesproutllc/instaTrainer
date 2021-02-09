const db = require('../model/dbModel');

const trainersControllers = {};

trainersControllers.assignWorkout = (req, res, next) =>{

}
trainersControllers.getClients = (req, res, next) => {
    console.log(req.cookies)
    return next()
}
module.exports = trainersControllers;