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
        // standardized all username to lowercase
        const param = [username.toLowerCase()];
        // check if username has existed in the table
        db.query(`SELECT * FROM trainers WHERE (username = $1);`, param).then(data => {
            // check if data comes back with result, means username taken
            if (data.rows.length) {
                res.locals.status = 'username taken';
                return next();
            } else {
                // if not, has password and insert information into the db
                bcrypt.hash(password, saltRounds, (err, hash) => {
                    const hashedPassword = hash;
                    const values = [username.toLowerCase(), hashedPassword, trainer_name];
                    db.query(`INSERT INTO trainers (username, password, trainer_name) VALUES ($1, $2, $3);`, values)
                    .then((data) => {
                        console.log('data', data)
                        return next();
                    })
                    .catch((err) => next({err}))
                })
            }
        })
    } else if (userType === 'client') {
        // extract client specific info
      const {
        first_name,
        last_name,
        age,
        height,
        weight,
        username,
        password,
      } = req.body;
      // standardized all username to lowercase
      const param = [username.toLowerCase()];
      // randomize trainer id to add to the db as foreign key
      const trainer_id = Math.ceil(Math.random() * 4);
      db.query(`SELECT * FROM clients WHERE (username = $1);`, param).then(
          // check if client username has been taken
        (data) => {
          if (data.rows.length) {
            res.locals.status = 'username taken';
            return next();
          } else {
            // if not, hash password and insert info into the db
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
                trainer_id,
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

// verifyUser for valid login credentials
authControllers.verifyUsers = (req, res, next) => {
    const {username, password, userType} = req.body;
    // standardize username to be lowercase
    const param = [username.toLowerCase()];
    // query db to find that existing username
    db.query(`SELECT * FROM ${userType} WHERE (username = $1);`, param)
    .then((data) => {
        if (data.rows.length === 0) {
          // if no such user, stop here
          res.locals.status = 'not found';
          return next();
        } else {
          // if there is such a user, compare password with encrypted password
          bcrypt.compare(password, data.rows[0].password, (err, result) => {
            if (result === true) {
              // if provided password matches saved password
              res.locals.statue = true;
              return next();
            } else {
              // if provided password does not match saved password
              res.locals.status = false;
              return next();
            }
          });
        }
    })
    .catch((err) => next({err}))
}

module.exports = authControllers;