import React, {
  useCallback,
  useRef,
  Fragment,
  useState,
  useEffect,
} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Textarea from 'react-expanding-textarea';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));
const useStylesTextField = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));
const useStylesSubmitButton = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

function ModalForm(props) {
  console.log('exercisesDropdown prop>>', props.exercisesDropdown);
  const classes = useStyles();
  const classesTextField = useStylesTextField();
  const classesSubmitButton = useStylesSubmitButton();
  const [excerciseType, setExerciseType] = React.useState('');
  const [exercise, setExercise] = React.useState('');
  const [duration, setDuration] = React.useState('');
  const [frequency, setSetFrequency] = React.useState('');
  const [notes, setNotes] = React.useState('');
  const textareaRef = useRef(null);
  //const [exercisesDropdown, setExercisesDropdown] = useState();
  const showExercises = (category) => {
    console.log('category ', category);
    const chosenCategory = props.existingExercises.filter(
      (elem) => elem.category === category
    );
    //console.log('dropwdown seleciton ', chosenCategory);
    props.setExercisesDropdown(chosenCategory);
    return chosenCategory;
  };
  const changeExerciseType = (event) => {
    setExerciseType(event.target.value);
    showExercises(event.target.value);
  };
  const changeExercise = (event) => {
    setExercise(event.target.value);
  };
  const changeDuration = (event) => {
    setDuration(event.target.value);
  };
  const changeFrequency = (event) => {
    setSetFrequency(event.target.value);
  };
  const filterSelection = () => {
    const uniqueExercecises = [];
    props.existingExercises.forEach((elem) => {
      if (!uniqueExercecises.includes(elem.category)) {
        uniqueExercecises.push(elem.category);
      }
    });
    console.log('unique data>>', uniqueExercecises);
    return uniqueExercecises.map((elem) => {
      return (
        <MenuItem key={elem} value={elem}>
          {elem}
        </MenuItem>
      );
    });
  };
  function handleSubmit(event) {
    event.preventDefault();
    if (props.addingWorkout) {
      console.log('addingwokrout is true');
      fetch('/api/trainers/exercise', {
        method: 'POST',
        body: JSON.stringify({
          plan_duration: duration,
          frequency,
          client_id: 12,
          exercise_id: exercise,
          notes,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => res.text())
        .then((response) => {
          props.setNewWorkoutPlan(response);
          props.append()
        })
        .catch((err) => console.log(err));
    } else {
      fetch('/api/trainers/exercise', {
        method: 'PUT',
        body: JSON.stringify({
          plan_duration: duration,
          frequency,
          client_id: 5,
          exercise_id: exercise,
          notes,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => res.text())
        .then((response) => props.append())
        .catch((err) => console.log(err));
    }
  }
  const checkForm = () => {
    if (props.addingWorkout) {
    }

    props.handleClose();
  };

  return (
    <div className='modal-form-container'>
      <form
        onSubmit={(e) => {
          handleSubmit(e);
          checkForm();
        }}
      >
        <div className='dropdown-container'>
          <div className='dropdown-detail-container'>
            <h4>Exercise Type</h4>
          </div>
          <FormControl className={classes.formControl}>
            <InputLabel id='demo-simple-select-label'>Body Muscle</InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              value={excerciseType}
              onChange={changeExerciseType}
            >
              {filterSelection()}
            </Select>
          </FormControl>
        </div>
        <div className='dropdown-container'>
          <div className='dropdown-detail-container'>
            <h4>Exercise: </h4>
          </div>
          <FormControl className={classes.formControl}>
            <InputLabel id='demo-simple-select-label'>Workouts</InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              value={exercise}
              onChange={changeExercise}
            >
              {props.exercisesDropdown
                ? props.exercisesDropdown.map((elem) => {
                    return (
                      <MenuItem value={elem.exercise_id}>{elem.name}</MenuItem>
                    );
                  })
                : null}
            </Select>
          </FormControl>
        </div>
        <div className='dropdown-container'>
          <div className='dropdown-detail-container'>
            <h4>Duration:</h4>
          </div>
          <FormControl className={classes.formControl}>
            <InputLabel id='demo-simple-select-label'>Time</InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              value={duration}
              onChange={changeDuration}
            >
              <MenuItem value={5}>5 min</MenuItem>
              <MenuItem value={10}>10 min</MenuItem>
              <MenuItem value={15}> 15 min</MenuItem>
              <MenuItem value={20}> 20 min</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className='dropdown-container'>
          <div className='dropdown-detail-container'>
            <h4>Frequency:</h4>
          </div>
          <FormControl className={classes.formControl}>
            <InputLabel id='demo-simple-select-label'>Age</InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              value={frequency}
              onChange={changeFrequency}
            >
              <MenuItem value={1}>1 times/day</MenuItem>
              <MenuItem value={2}>2 times/day</MenuItem>
              <MenuItem value={3}>3 times/day</MenuItem>
              <MenuItem value={4}>4 times/day</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className='dropdown-container'>
          <div className='dropdown-detail-container'>
            <h4>Notes:</h4>
            <div className={classesTextField.root}>
              <TextField
                onChange={(e) => setNotes(e.target.value)}
                id='outlined-basic'
                label='Notes'
                variant='outlined'
              />
            </div>
          </div>
          <Button
            type='submit'
            variant='contained'
            color='primary'
            disableElevation
            onClick={() => props.handleClose()}
          >
            Save
          </Button>
          <Button onClick={() => props.handleClose()}> Cancel</Button>
        </div>
      </form>
    </div>
  );
}

export default ModalForm;
