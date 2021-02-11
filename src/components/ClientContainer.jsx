import React, { Fragment, useState, useEffect } from 'react';
import ExercisesCard from './ExercisesCard.jsx';
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

function ClientContainer(props) {
  //tentative have loop to show cards - will wait on backend endpoint connection later
  const [authorizedView, setAuthorizedView] = useState(true);
  const [existingExercises, setExistingExercises] = useState();
  const [exercisesDropdown, setExercisesDropdown] = useState();
  const changeView = () => {
    setAuthorizedView(true);
  };
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
    fetch('/api/trainers/exercises')
      .then((res) => res.json())
      .then((response) => setExistingExercises(response))
      .catch((err) => console.log(err));
  };

  const handleClose = () => {
    setOpen(false);
  };
  const exerciseCards = [];
  for (let i = 0; i < 5; i += 1) {
    exerciseCards.push(<ExercisesCard authorizedView={authorizedView} />);
  }
  return (
    <div className='client-home-page-container'>
      <div className='user-profile-container'>
        <h2>Edit Matt Jiang's Workout Plan</h2>
        <div className='image-container'>
          <img
            className='image-class'
            src='https://ca.slack-edge.com/T01C0PF26GK-U01DSA9KMFV-5446a9a02b96-512'
            alt='profile-pic'
          />
        </div>
        <div>
          <h3 className='client-detail'>Matt Jiang</h3>
        </div>
        <div className='client-details-container'>
          <p className='client-detail'>age: 25</p>
          <p className='client-detail'>gender:male</p>
          <p className='client-detail'>height:10ft</p>
          <p className='client-detail'>weight: 180lbs</p>
        </div>
      </div>
      <div className='edit-card-container'>
        <button className='edit-button' onClick={handleOpen}>
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
                  existingExercises={existingExercises}
                  exercisesDropdown={exercisesDropdown}
                  setExercisesDropdown={setExercisesDropdown}
                />
              </div>
            ) : null}
          </Fade>
        </Modal>
      </div>
      <div className='cards-feed-container'>{exerciseCards}</div>
    </div>
  );
}

export default ClientContainer;
