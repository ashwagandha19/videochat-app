import { Grid, Typography, Paper } from "@mui/material";
import { makeStyles } from '@mui/styles';
import { useContext } from "react";

import { SocketContext } from '../SocketContext';

const useStyles = makeStyles((theme) => ({
    video: {
      width: '550px',
    },
    gridContainer: {
      justifyContent: 'center',
    },
    paper: {
      padding: '10px',
      border: '2px solid black',
      margin: '10px',
    },
  }));

const VideoPlayer = () => {
    const classes = useStyles();

    const { name, callAccepted, myVideo, remoteVideo, callEnded, stream, call } = useContext(SocketContext);

    return (
        <Grid container className={classes.gridContainer}>

            {
                stream && (
                    <Paper className={classes.paper}>
                        <Grid item xs={12} md={6}>
                            <h5>{name || 'name'}</h5>
                            <video playsInline muted ref={myVideo} autoPlay className="video" id="callerVideo"/>
                        </Grid>
                    </Paper>
                )
            }

            {
                callAccepted && !callEnded && (
                    <Paper className={classes.paper}>
                        <Grid item xs={12} md={6}>
                            <h5>{call.name || 'name'}</h5>
                            <video playsInline ref={remoteVideo} autoPlay className="video" id="remoteVideo"/>
                        </Grid>
                    </Paper>
                )
            }


        </Grid>
    )
}

export default VideoPlayer
