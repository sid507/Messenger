import React from 'react'
import { Avatar, IconButton } from '@material-ui/core'
import { useState, useEffect } from 'react'
import { AttachFile, MoreVert, SearchOutlined } from '@material-ui/icons'
import MoodIcon from '@material-ui/icons/Mood';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import { useParams } from 'react-router-dom';
import db from './firebase';
import { useStateValue } from './StateProvider';
import firebase from 'firebase';


import './Chat.css';

function Chat() {
    const [input, setinput] = useState('');
    const [seed, setseed] = useState('');
    const { roomId } = useParams();
    const [roomName, setRoomName] = useState("")
    const [message, setMessage] = useState([])
    const [{ user }, dispatch] = useStateValue();

    useEffect(() => {
        if (roomId) {
            db.collection("rooms").doc(roomId).onSnapshot(snapshot => {
                console.log(snapshot.data())
                setRoomName(snapshot.data().name)
            })
            db.collection("rooms").doc(roomId).collection("Messages").orderBy('timestamp', 'asc').onSnapshot((snapshot) => {
                setMessage(snapshot.docs.map(doc => doc.data()))
            })
        }
    }, [roomId])
    useEffect(() => {
        setseed(Math.floor(Math.random() * 5000));
    }, [roomId])

    const sendMessage = (e) => {
        e.preventDefault();
        // console.log(`u typed ${input}`);
        db.collection('rooms').doc(roomId).collection('Messages').add(
            {
                name: user.displayName,
                message: input,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            }
        )
        setinput('');
    }
    return (
        <div className="chat">
            <div class="chat__header">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}></Avatar>
                <div class="chat__headerInfo">
                    <h3>{roomName}</h3>
                    <p>{new Date(message[message.length - 1]?.timestamp?.toDate()).toUTCString()}</p>
                </div>
                <div class="chat__headerRight">
                    <IconButton>
                        <SearchOutlined />

                    </IconButton>
                    <IconButton>
                        <AttachFile />

                    </IconButton><IconButton>
                        <MoreVert />

                    </IconButton>


                </div>
            </div>
            <div class="chat__body">
                {message.map((m) => (
                    <p class={`chat__message ${m.name === user.displayName && "chat__reciever"}`}><span className="chat__name">{m.name}</span>{m.message}
                        <span class="chat__timestamp">{new Date(m.timestamp?.toDate()).toUTCString()}</span></p>
                ))}

                {/* <p class="chat__message">Hey guys</p> */}

            </div>
            <div class="chat__footer">
                <MoodIcon />
                <form>
                    <input value={input} onChange={e => setinput(e.target.value)} placeholder="Enter the message..."></input>
                    <button onClick={sendMessage}>Send</button>
                </form>
                <SearchOutlined />

                <AttachFileIcon />

            </div>
        </div>
    )
}

export default Chat
