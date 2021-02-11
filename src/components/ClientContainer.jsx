import React, { Fragment, useState, useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import ExercisesCard from './ExercisesCard.jsx';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import { useSpring, animated } from 'react-spring/web.cjs';
import ModalForm from './ModalForm';
import ClientCard from './ClientCard';

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

function ClientContainer(props) {
  //tentative have loop to show cards - will wait on backend endpoint connection later
  const [authorizedView, setAuthorizedView] = useState(true);
  const [existingExercises, setExistingExercises] = useState();
  const [exercisesDropdown, setExercisesDropdown] = useState();
  const [appendNewExcercise, setappendNewExercise] = useState();
  const [addingWorkout, setAddingWorkout] = useState(true);
  const [exerciseCards, setExerciseCards] = useState();
  const [newWorkoutPlan, setNewWorkoutPlan] = useState();
  const [clientInfo, setClientInfo] = useState();
  console.log('clientInfo: ', clientInfo);

  const changeView = () => {
    setAuthorizedView(true);
  };
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
    //this will pull all info from exercise table so we can filter on modal
    fetch('/api/trainers/exercises')
      .then((res) => res.json())
      .then((response) => setExistingExercises(response))
      .catch((err) => console.log(err));
  };
  //const exerciseCards = [];
  //will use props.id to fetch request
  const { params } = useRouteMatch();
  const clientId = params.clientid;
  useEffect(() => {
    fetch(`/api/trainers/${clientId}`)
      .then((res) => res.json())
      .then((response) => {
        console.log('api/trainers/clientid response: ', response);
        //TODO: change format of response to be {clientInfo: {first_name, ...}, exercises: [{plan_duration, ...}]}
        const {first_name, last_name, age, gender, height, weight} = response[0];
        setClientInfo({
          first_name,
          last_name,
          age,
          gender,
          height,
          weight,
        })
        const gotCards = [];
        for (let i = 0; i < response.length; i += 1) {
          gotCards.push(
            <ExercisesCard
              plan_duration={response[i].plan_duration}
              frequency={response[i].frequency}
              exercise_id={response[i].exercise_id}
              notes={response[i].notes}
              client_id={response[i].client_id}
              id={`${i}`}
              authorizedView={authorizedView}
              setExistingExercises={setExistingExercises}
              existingExercises={existingExercises}
              exercisesDropdown={exercisesDropdown}
              setExercisesDropdown={setExercisesDropdown}
              appendNewExcercise={appendNewExcercise}
              append={append}
              handleOpen={handleOpen}
              handleClose={handleClose}
              removeCard={removeCard}
              cardNum={`${i}`}
            />
          );
        }
        setExerciseCards(gotCards);
      })
      .catch((err) => console.log(err));
  }, []);
  const getClientWorkouts = () => {};
  const getAsssignedWorkouts = () => {
    fetch('/api/clients/dashboard')
      .then((res) => res.json())
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
  };
  //getAsssignedWorkouts();
  const handleClose = () => {
    setOpen(false);
  };
  const removeCard = (e) => {
    const findCardElem = e.target.id.replace(/[^0-9]/g, '');
    console.log(findCardElem);
    const cardElem = document.getElementById(findCardElem);
    function removeAllChildNodes(parent) {
      while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
      }
    }
    removeAllChildNodes(cardElem);
  };

  const newCard = [];
  const append = () => {
    newWorkoutPlan.newCard.unshift(
      <ExercisesCard
        plan_duration={newWorkoutPlan.plan_duration}
        frequency={newWorkoutPlan.frequency}
        exercise_id={newWorkoutPlan.exercise_id}
        notes={newWorkoutPlan.notes}
        client_id={newWorkoutPlan.client_id}
        authorizedView={authorizedView}
        existingExercises={existingExercises}
        exercisesDropdown={exercisesDropdown}
        setExercisesDropdown={setExercisesDropdown}
        appendNewExcercise={appendNewExcercise}
        append={append}
        addingWorkout={false}
      />
    );
    console.log('newcard in append');
    setappendNewExercise(newCard);
  };

  return (
    <div className='client-home-page-container'>
      {clientInfo && <ClientCard clientInfo={clientInfo}/>}
      <div className='edit-card-container'>
        <button id='add-button-id' className='edit-button' onClick={handleOpen}>
          Add WorkOut
        </button>
        <Modal
          aria-labelledby='spring-modal-title'
          aria-describedby='spring-modal-description'
          className={classes.modal}
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            {existingExercises ? (
              <div className={classes.paper}>
                <h2 id='spring-modal-title'>Add WorkOut</h2>
                <ModalForm
                  key='modal-submit'
                  setNewWorkoutPlan={setNewWorkoutPlan}
                  existingExercises={existingExercises}
                  exercisesDropdown={exercisesDropdown}
                  setExercisesDropdown={setExercisesDropdown}
                  appendNewExcercise={appendNewExcercise}
                  append={append}
                  handleClose={handleClose}
                  addingWorkout={addingWorkout}
                />
              </div>
            ) : null}
          </Fade>
        </Modal>
      </div>
      <div id='cards-feed-id' className='cards-feed-container'>
        {appendNewExcercise ? appendNewExcercise : null}
        {exerciseCards ? exerciseCards : null}
      </div>
    </div>
  );
}

export default ClientContainer;
