import React from 'react';
import { Typography, AppBar } from "@mui/material";
import './reset.css';
import './App.css';
import VideoPlayer from './components/VideoPlayer';
import Options from './components/Options';
import Notifications from './components/Notifications';
import { makeStyles } from '@mui/styles';


const useStyles = makeStyles(() => ({
  image: {
    marginLeft: '15px',
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
}));

const App = () => {

  const classes = useStyles();

  return (
      <div className={classes.wrapper}>
      <Typography id="title" variant="h1" component="div" color="primary" gutterBottom>
          Videochat App
        </Typography>
        <VideoPlayer/>
        <Options>
          <Notifications/>
        </Options>
      </div>
  );
}

export default App;
