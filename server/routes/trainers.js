// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// +++ Router for methods to grab client work out session history +++
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const express = require('express');
const router = express.Router();
const trainersControllers = require('../controllers/trainersControllers');


router.get('/dashboard', trainersControllers.getClients, (req, res) => res.status(200).json(res.locals.clients))
router.get('/:clientId', trainersControllers.getProfile, (req, res) =>
  res.status(200).json(res.locals.profile)
);
module.exports = router;