// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// +++ Router for methods to grab client work out session history +++
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const express = require('express');
const router = express.Router();
const clientsControllers = require('../controllers/clientsControllers');
router.get('/sessions', clientsControllers.getSessions,(req, res) =>{
    if(res.locals.sessions) return res.status(200).json(res.locals.sessions)
})


module.exports = router;