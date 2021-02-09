// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// +++ Router for methods to grab client work out session history +++
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const express = require('express');
const router = express.Router();
const clientsControllers = require('../controllers/clientsControllers');
router.get('/progress/:client_id', clientsControllers.getSessions,(req, res) =>{
    if(res.locals.sessions) return res.status(200).json(res.locals.sessions)
})

router.post('/post_session/', clientsControllers.postSession,(req, res) =>{
    if(res.locals.postedSession) return res.status(200).json(res.locals.postedSession)
})


module.exports = router;