import { Button } from '@mui/material'
import { useContext } from "react";
import { SocketContext } from '../SocketContext';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';

const Notifications = () => {
    const { answerCall, call, callAccepted } = useContext(SocketContext);
    console.log(call);

    return (
        <>
            {call.isReceivingCall && !callAccepted && (
                <div id="notificationsContainer">
                    <p className="notificationsName">{call.name} is calling: </p>
                    <Button className="button" variant="contained" color="secondary" size="medium" startIcon={<PhoneInTalkIcon fontSize="large" />} onClick={answerCall}>
                        Answer Call
                    </Button>
                </div>
            )}
        </>
    )
}

export default Notifications
