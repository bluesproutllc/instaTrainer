// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// +++ Router for methods to create accounts and login on website +++
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const express = require('express');
const router = express.Router();

const authControllers = require('../controllers/authControllers');
router.post(
  '/signup',
  authControllers.createUsers,
  authControllers.setSSIDCookie,
  authControllers.startCookieSession,
  (req, res) => {
    if (res.locals.status === 'username taken') {
      return res.status(409).send('username taken');
    }
    const { userId, userType } = res.locals;
    return res.status(200).json({ userId, userType });
  }
);
router.post('/signin', authControllers.verifyUsers, authControllers.setSSIDCookie, authControllers.startCookieSession, (req, res) => {
  if (res.locals.status === 'not found' || res.locals.status === false) {
    return res.status(409).send('username or password is incorrect');
  }
  const {userId, userType} = res.locals;
  return res.status(200).json({userId, userType});
});

module.exports = router;
