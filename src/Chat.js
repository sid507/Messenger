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
    const [input, setInput] = useState("");
    const [seed, setSeed] = useState("");
    const {roomId} = useParams();
    const [roomName, setRoomName] = useState("");
    const [message, setMessages] = useState([]);
    const [{user}, dispatch] = useStateValue();
    var CryptoJS = require("crypto-js");


    useEffect(()=>{
        if(roomId){
            db.collection('rooms').doc(roomId).onSnapshot(snapshot => {
                setRoomName(snapshot.data().name);
            });

            db.collection('rooms').doc(roomId).collection("messages").orderBy("timestamp","asc").onSnapshot(snapshot => {
                setMessages(snapshot.docs.map(doc => doc.data()))
            });

        }
    },[roomId])

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));        
    }, [roomId]);

    const sendMessage = (e) => {
        e.preventDefault();
        db.collection('rooms').doc(roomId).collection('messages').add({
            message: CryptoJS.AES.encrypt(input.toString(),'secretKey').toString(),
            name:CryptoJS.AES.encrypt(user.displayName.toString(),'secretKey').toString(), 
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })

        setInput("");
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
                    <p class={`chat__message ${CryptoJS.AES.decrypt(m.name,'secretKey').toString(CryptoJS.enc.Utf8) === user.displayName && "chat__reciever"}`}><span className="chat__name">{CryptoJS.AES.decrypt(m.name,'secretKey').toString(CryptoJS.enc.Utf8)}</span>{CryptoJS.AES.decrypt(m.message,'secretKey').toString(CryptoJS.enc.Utf8)}
                        <span class="chat__timestamp">{new Date(m.timestamp?.toDate()).toUTCString()}</span></p>
                ))}

                {/* <p class="chat__message">Hey guys</p> */}

            </div>
            <div class="chat__footer">
                <MoodIcon />
                <form>
                    <input value={input} onChange={e => setInput(e.target.value)} placeholder="Type a message"></input>
                    <button onClick={sendMessage}>Send</button>
                </form>
                <SearchOutlined />

                <AttachFileIcon />

            </div>
        </div>
    )
}

export default Chat
