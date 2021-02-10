// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// +++ Router for methods to grab trainers views                  +++
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const express = require('express');
const router = express.Router();
const workoutControllers = require('../controllers/workoutControllers');

router.get('/:clientId', workoutControllers.getClientProfile, (req, res) =>
  res.status(200).json(res.locals.profile)
);

module.exports = router;
