import { Button, Input, Grid, Container, Paper, Box, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useContext, useState } from 'react';
import { SocketContext } from '../SocketContext';
import { CopyToClipboard } from "react-copy-to-clipboard";
import AssignmentIcon from '@mui/icons-material/Assignment';
import PhoneDisabledIcon from '@mui/icons-material/PhoneDisabled';
import PhoneIcon from '@mui/icons-material/Phone';

import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#d81b60',
    },
    secondary: {
      main: '#7c4dff',
      contrastText: '#fff',
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
});

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
    },
    gridContainer: {
      width: '100%',
    },
    container: {
      width: '600px',
      margin: '35px 0',
      padding: 0,
    },
    margin: {
      marginTop: 20,
    },
    padding: {
      padding: 20,
    },
    paper: {
      padding: '10px 20px',
      border: '1px solid black',
    },
   }));

const Options = ({ children }) => {

    const { me, callAccepted, name, setName, callEnded, endCall, callUser} = useContext(SocketContext);

    const [idToCall, setIdToCall] = useState('');

    const classes = useStyles();

    return (
        <ThemeProvider theme={theme}>
            <Container className={classes.container}>
                <Paper elevation={10} className={classes.paper}>
                    <form className={classes.root}>
                        <Grid container className={classes.gridContainer}>
                            <Grid item xs={12} md={6} className={classes.padding}>
                                    <Box sx={{ mb: 2 }}>
                                        <TextField className="input" type="text" label="Your name" value={name} onChange={(e) => setName(e.target.value)}/>
                                    </Box>
                                    <CopyToClipboard text={me}>
                                        <Button className="button" variant="contained" color="primary" size="medium" startIcon={
                                            <AssignmentIcon fontSize="large"/>
                                        }>
                                            Copy your ID
                                        </Button>
                                    </CopyToClipboard>
                            </Grid>

                            <Grid item xs={12} md={6} className={classes.padding}>
                                    <Box sx={{ mb: 2 }}>
                                        <TextField className="input" type="text" label="ID to call" value={idToCall} onChange={(e) => setIdToCall(e.target.value)}/>
                                    </Box>
                                {callAccepted && !callEnded ? (
                                    <Button className="button" variant="outlined" color="error" 
                                        startIcon={ <PhoneDisabledIcon fontSize="large"/>}  
                                        onClick={endCall} 
                                    >
                                        Hang Up
                                    </Button>
                                    ) : (
                                        <Button className="button" variant="contained" color="primary" size="medium"  startIcon={<PhoneIcon fontSize="large" />} onClick={() => callUser(idToCall)}>
                                        Call
                                    </Button>
                                )
                                }
                            </Grid>
                        </Grid>
                    </form>
                    {children}
                </Paper>
            </Container>
        </ThemeProvider>
    )
}

export default Options
