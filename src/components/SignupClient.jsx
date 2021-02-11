import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useForm } from "react-hook-form";
import logo from "../assets/logo.png"
import { Link } from "react-router-dom";

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
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },

  paper: {
    marginTop: theme.spacing(8),
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignupClient(props) {
  const classes = useStyles();
  const { register, handleSubmit, setValue } = useForm();

  const [userType, setUserType] = useState('client');

  const handleClick = (e) => {
    if (userType === 'client') setUserType('trainer')
    else setUserType('client')
  }

  const onSubmit = (data) => {
    const values = {
      username: data.username,
      password: data.password,
      userType: userType,
      first_name: data.first_name,
      last_name: data.last_name,
      age: data.age,
      height: data.height,
      weight: data.weight,
      gender: data.gender
    }
    console.log('values: ',values)
    fetch('/api/auth/signup', {
      body: JSON.stringify(values),
      method: 'POST',
      headers: { 'Content-Type': 'Application/JSON'},
    })
      .then(res => {
        // *** NEED TO CHECK IF USER IS CLIENT OR TRAINER
        if (res.status === 200) {
          props.history.push('/dashboard')
        } else alert("Error creating account. Please try again.")
        
      })
      .catch(err => console.log('error creating user: ', err))
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        {/* <Avatar className={classes.avatar}> */}
        <img src={logo}></img>
        {/* </Avatar> */}
        {/* <Typography component="h1" variant="h5">
          Sign up
        </Typography> */}
        <form onSubmit={handleSubmit(onSubmit)} className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
              inputRef={register}
                name="first_name"
                variant="outlined"
                required
                fullWidth
                id="first_name"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
              inputRef={register}
                variant="outlined"
                required
                fullWidth
                id="last_name"
                label="Last Name"
                name="last_name"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
              inputRef={register}
                variant="outlined"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
              inputRef={register}
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
              />
             
            </Grid>
            <Grid item xs={3}>
              <TextField
              inputRef={register}
                variant="outlined"
                required
                fullWidth
                name="age"
                label="Age"
                type="age"
                id="age"
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
              inputRef={register}
                variant="outlined"
                required
                fullWidth
                name="height"
                label="Height"
                type="height"
                id="height"
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="weight"
                label="Weight"
                type="weight"
                id="weight"
              />
            </Grid>

            <Grid item xs={3}>
              <select 
              variant="outlined"
              fullWidth
              name="gender"
              label="gender"
              type="gender"
              id="gender"
              ref={register}>
                <option value="female">female</option>
                <option value="male">male</option>
                <option value="other">other</option>
              </select>
            </Grid>
            

            
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to='/login' variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      
    </Container>
  );
}