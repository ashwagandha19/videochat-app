import React, { createContext, useState, useRef, useEffect } from 'react';
import { io } from 'socket.io-client';
import Peer from 'simple-peer';

const SocketContext = createContext();

const socket = io('https://psic-og-2k21.herokuapp.com/');

const ContextProvider = ({ children }) => {

    //* caller data getting and video stream set
    const [stream, setStream] = useState(null);
    const myVideo = useRef();
    const remoteVideo = useRef();
    const [me, setMe] = useState("");

    const [call, setCall] = useState({});
    const [callAccepted, setCallAccepted] = useState(false);
    const [callEnded, setCallEnded] = useState(false);

    const [name, setName] = useState('');

    const connectionRef = useRef();

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({
            video: true, 
            audio: true
        }).then((currentStream) => {
            setStream(currentStream);
            myVideo.current.srcObject = currentStream;
        })

        socket.on('me', (id) => {
            setMe(id);
        })

        socket.on('callUser', ({from, name: callerName, signal}) => {
            setCall({isReceivingCall: true, from, name: callerName, signal})
        })
    }, []);
    

    const answerCall = () => {
        setCallAccepted(true);

        const peer = new Peer({ initiator: false, trickle: false, stream });
    
        peer.on('signal', (data) => {
          socket.emit('answerCall', { signal: data, to: call.from });
        });
    
        peer.on('stream', (currentStream) => {
          remoteVideo.current.srcObject = currentStream;
        });
    
        peer.signal(call.signal);
    
        connectionRef.current = peer;
    }

        
    const callUser = (id) => {
        const peer = new Peer({ initiator: true, trickle: false, stream });

        peer.on('signal', (data) => {
            socket.emit('callUser', { remoteUserId: id, signalData: data, from: me, name })
        })

        peer.on('stream', (currentStream) => {
            remoteVideo.current.srcObject = currentStream;
        })

        socket.on('callAccepted', (signal) => {
            setCallAccepted(true);
            peer.signal(signal);
        });

        connectionRef.current = peer;
    }


    const endCall = () => {
        setCallEnded(true);
        connectionRef.current.destroy();

        window.location.reload();
    }


    return(
        <SocketContext.Provider value={{
            call,
            callAccepted,
            myVideo,
            remoteVideo,
            stream,
            name,
            setName,
            callEnded,
            me,
            callUser,
            endCall,
            answerCall
        }}>
            {children}
        </SocketContext.Provider>
    )
}

export { ContextProvider, SocketContext };