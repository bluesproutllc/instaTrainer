import React, { Fragment, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import { useSpring, animated } from 'react-spring/web.cjs';
import ModalForm from './ModalForm';
const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));
const Fade = React.forwardRef(function Fade(props, ref) {
  const { in: open, children, onEnter, onExited, ...other } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter();
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited();
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {children}
    </animated.div>
  );
});

function ExercisesCard({
  authorizedView,
  existingExercises,
  exercisesDropdown,
  setExercisesDropdown,
  appendNewExcercise,
  setExistingExercises,
  removeCard,
  append,
  cardNum,
  plan_duration,
  frequency,
  exercise_id,
  notes,
  client_id,
  setNewWorkoutPlan,
  addingWorkout,
}) {
  //console.log(props)
  const classes = useStyles();
  const [openEdit, setOpenEdit] = React.useState(false);
  const [editExistingInfo, seteditExistingInfo] = useState();
  const handleOpen = () => {
    setOpenEdit(true);
    fetch('/api/trainers/exercises')
      .then((res) => res.json())
      .then((response) => seteditExistingInfo(response))
      .catch((err) => console.log(err));
  };

  const handleClose = () => {
    setOpenEdit(false);
  };
  return (
    <div id={`${cardNum}`} className='div-container'>
      <div className='client-card-container'>
        <div className='buttons-image-container'>
          <div className='image-side-container'>
            <img
              className='exercise-image'
              src='https://image.shutterstock.com/image-photo/father-working-out-doing-single-260nw-1669031986.jpg'
              alt=''
            />
          </div>
        </div>
        <div className='right-side-excercise-card'>
          <div className='exercise-info-container'>
            <div className='duration-frequency-container'>
              <div className='duration-box'>
                <p id='duration-min-id' className='exercise-detail'>
                  {`${plan_duration}`}min
                </p>
                <p className='exercise-detail'>Duration</p>
              </div>
              <div className='frequency-box'>
                <p id='frequency-time-id' className='exercise-detail'>
                  {`${frequency}`}/day
                </p>{' '}
                <p className='exercise-detail'>Frequency</p>
              </div>
            </div>
            <p id='notes-id' className='exercise-detail'>
              Notes:{`${notes}`}
            </p>
          </div>
          {authorizedView ? (
            <div className='edit-card-container'>
              <button className='edit-button-id' onClick={handleOpen}>
                Edit
              </button>
              <button
                exercise_id={exercise_id}
                client_id={client_id}
                id={`id-button-${cardNum}`}
                onClick={(e) => removeCard(e)}
                className='remove-button-id'
              >
                Remove
              </button>
              <Modal
                key='modal-form-edit'
                aria-labelledby='spring-modal-title'
                aria-describedby='spring-modal-description'
                className={classes.modal}
                open={openEdit}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                  timeout: 500,
                }}
              >
                <Fade in={openEdit}>
                  {editExistingInfo ? (
                    <div className={classes.paper}>
                      <h2 id='spring-modal-title'>Add WorkOut</h2>
                      <ModalForm
                        key='modal-form-edit'
                        authorizedView={authorizedView}
                        existingExercises={editExistingInfo}
                        exercisesDropdown={exercisesDropdown}
                        setExercisesDropdown={setExercisesDropdown}
                        appendNewExcercise={appendNewExcercise}
                        append={append}
                        addingWorkout={addingWorkout}
                        handleClose={handleClose}
                      />
                    </div>
                  ) : null}
                </Fade>
              </Modal>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default ExercisesCard;
