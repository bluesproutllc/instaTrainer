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
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function ModalForm(props) {
  const classes = useStyles();
  const [excerciseType, setExerciseType] = React.useState('');
  const [exercise, setExercise] = React.useState('');
  const [duration, setDuration] = React.useState('');
  const [frequency, setSetFrequency] = React.useState('');
  const textareaRef = useRef(null);
  const changeExerciseType = (event) => {
    setExerciseType(event.target.value);
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
  const changeTextValue = useCallback((e) => {
    console.log('Changed value to: ', e.target.value);
  }, []);
  return (
    <div className='modal-form-container'>
      <div className='dropdown-container'>
        <div className='dropdown-detail-container'>
          <h4>Exercise Type:</h4>
        </div>
        <FormControl className={classes.formControl}>
          <InputLabel id='demo-simple-select-label'>Age</InputLabel>
          <Select
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            value={excerciseType}
            onChange={changeExerciseType}
          >
            <MenuItem value={10}>Arms</MenuItem>
            <MenuItem value={20}>Legs</MenuItem>
            <MenuItem value={30}>Back</MenuItem>
            <MenuItem value={30}>Shoulders</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className='dropdown-container'>
        <div className='dropdown-detail-container'>
          <h4>Exercise Type:</h4>
        </div>
        <FormControl className={classes.formControl}>
          <InputLabel id='demo-simple-select-label'>Age</InputLabel>
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
          <h4>Exercise:</h4>
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
          <Textarea
            className='textarea'
            defaultValue='Lorem ipsum dolor sit amet, ...'
            id='my-textarea'
            maxLength='3000'
            name='pet[notes]'
            onChange={changeTextValue}
            placeholder='Enter additional notes...'
            ref={textareaRef}
          />
        </div>
      </div>
    </div>
  );
}

export default ModalForm;
