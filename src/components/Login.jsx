import React, { useState, useEffect } from 'react';
// import AppContext from './context/index';
// import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
// import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import logo from "../assets/logo.png"

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        InstaTrainer
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}




const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/?sports)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
    theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    position: 'Absolute',
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  // avatar: {
  //   margin: theme.spacing(1),
  //   backgroundColor: theme.palette.secondary.main,
  // },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


export default function Login(props) {

  const classes = useStyles();
  
  // const [loggedIn, setLoggedIn] = useState(false);
  const [userType, setUserType] = useState('client');
  const { register, handleSubmit, setValue } = useForm();
  
  const handleClick = (e) => {
    if (userType === 'client') setUserType('trainer')
    else setUserType('client')
  }

  const onSubmit = (data) => {
    const values = {
      username: data.username,
      password: data.password,
      userType: userType
    }
    fetch('/api/auth/signin', {
      body: JSON.stringify(values),
      method: 'POST',
      headers: { 'Content-Type': 'Application/JSON'},
    })
      .then(res => {
        // *** NEED TO CHECK IF USER IS CLIENT OR TRAINER
        if (res.status === 200) {
          props.history.push('/dashboard');
        } else alert("Username/Password are incorrect. Please try again, or Sign up Now!")
        
      })
      .catch(err => console.log('error username or password does not exist: ', err))
  }
  
  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          {/* <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar> */}
          <img src={logo}></img>
          {/* <Typography component="h1" variant="h5">
            Sign in
          </Typography> */}
          <form onSubmit={handleSubmit(onSubmit)} className={classes.form} noValidate>
            <TextField
              inputRef={register}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
            />
            <TextField
              inputRef={register}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
             <FormControlLabel
              control={<Checkbox 
                inputRef={register} 
                value={userType}  
                color="primary" 
                onChange={handleClick}/>}
              label="Check here to sign in as Trainer"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >

             Sign In
            </Button>
            
            <Grid item>
                <Link  variant="body2" to='/signupclient'>
                  {"Sign up as Client"}
                </Link>
              </Grid>
             

              <Grid item>
                <Link  variant="body2" to='/signuptrainer'>
                  {"Sign up as Trainer"}
                </Link>
            </Grid>
           
            
          </form>
        </div>
      </Grid>
    </Grid>
  );
};            
