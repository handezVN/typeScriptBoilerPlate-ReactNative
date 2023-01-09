import {ADD_REMOTE_STREAM,ADD_STREAM,JOIN_CHAT,MY_STREAM} from './type'
import IO from 'socket.io-client'
import Peer from 'react-native-peerjs';

export const API_URI = `http://192.168.1.16:8000`



const peerServer = new Peer(
{
    secure:false,
    // debug:3
}
)
peerServer.on('error',() => console.log)


export const socket = IO(`${API_URI}`,{
    forceNew: true
})

socket.on('connection',() => console.log('Connected client'));

export const joinRoom = (stream:any) => async(dispatch:any)=>{
    const roomID = 'adhasdjasdjnkjn123';
    dispatch({type: MY_STREAM,payload:stream});

    peerServer.on('open',(userId:any) =>{
        socket.emit('join-room',{userId,roomID});
    })

    socket.on('user-connected',(userId:any) =>{
        console.log('step 1');
        connectToNewUser(userId,stream,dispatch);
    })

    peerServer.on('call',(call:any) =>{
        console.log('step 2 call ');
        call.answer(stream);
        console.log('123123 peer called');
        call.on('stream',(stream:any) =>{
            dispatch({type: ADD_STREAM,payload:stream});
            console.log('hello stream')
        })
    } )
}

function connectToNewUser(userId:any,stream:any,dispatch:any){
    const call = peerServer.call(userId,stream);
}