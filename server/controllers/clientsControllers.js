const db = require('../model/dbModel');

const clientsControllers = {};

clientsControllers.getSessions = (req, res, next) =>{
    const client_id  = req.params.client_id;
    const getSessionsQuery = 'SELECT * FROM session_history WHERE (client_id = $1);'
    const param = [client_id]
    db.query(getSessionsQuery, param).then(data =>{
        if(data.rows.length){
            res.locals.sessions = data.rows;
            return next();
        }
        res.locals.sessions = `No available data for client`;
        return next()
    }).then(err => next({err}))
}

clientsControllers.postSession = (req, res, next) =>{
    const {duration, exercise_id, client_id}  = req.body
    const postSessionsQuery = ' INSERT INTO session_history (duration, client_id, exercise_id) VALUES ($1 ,$2, $3);'
    const param = [duration,client_id, exercise_id];
    db.query(postSessionsQuery, param).then(data =>{
      res.locals.postedSession = true;
      return next()
    }).then(err => next({err}))
}

module.exports = clientsControllers;