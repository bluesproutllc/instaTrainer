// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// +++ Router for methods to grab client work out session history +++
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const express = require('express');
const router = express.Router();
const trainersControllers = require('../controllers/trainersControllers');

// get trainer's dashboard with all clients
router.get('/dashboard', trainersControllers.getClients, (req, res) => {
  const trainerInfoAndClients = {trainer: {firstName: 'FIRSTNAME', lastName: 'LASTNAME', trainerId: 'TRAINERID'}, clients: res.locals.clients};
  res.status(200).json(trainerInfoAndClients);
})
// get all exercises when the modal pops up
router.get('/exercises', trainersControllers.getExercises, (req, res) =>
  res.status(200).json(res.locals.exercises)
);
// create an exercise plan
router.post('/exercise', trainersControllers.createPlan, (req, res) => {
  if (res.locals.status === 'existing plan') {
    return res.status(409).send('exisiting plan');
  } else {
    return res.status(200).json(res.locals.plan);
  }
})
// edit each exercise plan
router.put('/exercise', trainersControllers.editPlan, (req, res) => res.status(200).json(res.locals.newPlan))
// delete each exercise plan
router.delete('/exercise', trainersControllers.deletePlan, (req, res) => res.status(200).send('deleted'))
// get each client's profile
router.get('/:client_id', trainersControllers.getProfile, (req, res) =>
  res.status(200).json(res.locals.profile)
);

module.exports = router;