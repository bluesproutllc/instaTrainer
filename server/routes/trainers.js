// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// +++ Router for methods to grab client work out session history +++
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const express = require('express');
const router = express.Router();
const trainersControllers = require('../controllers/trainersControllers');

// get trainer's dashboard with all clients
router.get('/dashboard', trainersControllers.getClients, (req, res) => res.status(200).json(res.locals.clients))
// get all exercises when the modal pops up
router.get('/exercises', trainersControllers.getExercises, (req, res) =>
  res.status(200).json(res.locals.exercises)
);
// edit each exercise plan
router.delete('/exercise', trainersControllers.deletePlan, (req, res) => res.status(200).send('deleting'))
// get each client's profile
router.get('/:client_id', trainersControllers.getProfile, (req, res) =>
  res.status(200).json(res.locals.profile)
);

module.exports = router;