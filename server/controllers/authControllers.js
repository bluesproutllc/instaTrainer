const db = require('../model/dbModel');
const bcrypt = require('bcrypt');
const saltRounds = 15;

const authControllers = {};

// setSSIDCookie - store the user id from database in cookie
authControllers.setSSIDCookie = (req, res, next) => {
    // set cookie with key 'ssid' to value user's id 
    res.cookie('ssid', res.locals.id, {
        httpOnly: true,
        sameSite: 'None',
        secure: true,
    })
    return next()
}
// createUser for sign-up 
authControllers.createUsers = (req, res, next) => {
    // check if user checks 'trainer' or 'client' box
    const {userType} = req.body;
    // if user is a trainer, extract fullname, username, password
    if (userType === 'trainer') {
        const {trainer_name, username, password} = req.body;
        const param = [username.toLowerCase()];
        db.query(`SELECT * FROM trainers WHERE (username = $1);`, param).then(data => {
            if (data.rows.length) {
                res.locals.status = 'trainer exists';
                return next();
            } else {
                bcrypt.hash(password, saltRounds, (err, hash) => {
                    const hashedPassword = hash;
                    const values = [username.toLowerCase(), hashedPassword, trainer_name];
                    db.query(`INSERT INTO trainers (username, password, trainer_name) VALUES ($1, $2, $3);`, values)
                    .then((data) => next())
                    .catch((err) => next({err}))
                })
            }
        })
    } else if (userType === 'client') {
      const { first_name, last_name, age, height, weight, username, password } = req.body;
      const param = [username.toLowerCase()];
      const trainer_id = Math.ceil(Math.random() * 4);
      db.query(`SELECT * FROM clients WHERE (username = $1);`, param).then(
        (data) => {
          if (data.rows.length) {
            res.locals.status = 'client exists';
            return next();
          } else {
            bcrypt.hash(password, saltRounds, (err, hash) => {
              const hashedPassword = hash;
              const values = [
                username.toLowerCase(),
                hashedPassword,
                first_name,
                last_name,
                age,
                height,
                weight,
                trainer_id
              ];
              db.query(
                `INSERT INTO clients (username, password, first_name, last_name, age, weight, height, trainer_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8);`,
                values
              )
                .then((data) => next())
                .catch((err) => next({ err }));
            });
          }
        }
      );
    }

}
module.exports = authControllers;