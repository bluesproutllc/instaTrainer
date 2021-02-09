const express = require('express')
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express()
const PORT = 3000

const authRouter = require('./routes/auth');
const trainersRouter = require('./routes/trainers');
const clientsRouter = require('./routes/clients')

// parse request body later
app.use(express.json())
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }))




// handle routes for authentication
app.get('/api/greeting', (req, res) => {
  console.log('hi')
  return res.status(200).send('success');
})
app.use('/api/auth', authRouter)
// serve static index.html file on root endpoint
app.get('/', (req, res) => {
  return res.sendFile(path.resolve(__dirname, '../src/index.html'));
});
// middleware to catch not found enpoints
app.use((req, res) => res.status(404).send('Not found')); //catch-all route handler--for unknown routes

// global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign(defaultErr, err);
  console.log(errorObj);
  return res.status(errorObj.status).json(errorObj.message);
});
app.listen(PORT, () => { console.log(`Listening on port ${PORT}...`); })