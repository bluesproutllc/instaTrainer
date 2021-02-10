// const db = require('../model/dbModel');

// const workoutControllers = {};

// workoutControllers.getClientProfile = (req, res, next) => {
//     const value = [req.params.clientId];
//     db.query(`SELECT * FROM clients WHERE (client_id = $1);`, value)
//     .then(data => {
//         res.locals.profile = data.rows[0];
//         return next()
//     })
//     .catch(err => next({err}))
// }
// module.exports = workoutControllers;
