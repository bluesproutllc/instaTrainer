// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// +++ Router for methods to grab client work out session history +++
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const express = require('express');
const router = express.Router();
const clientsControllers = require('../controllers/clientsControllers');


router.get('/dashboard', clientsControllers.getExersices, (req, res) => {
  console.log('res.local', res.local)
  const {profile, workout} = res.locals;
    return res.status(200).json({profile, workout})
  }
);



module.exports = router;