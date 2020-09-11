import React from 'react'

import { Avatar } from '@material-ui/core';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './SidebarChat.css';
import db from './firebase';
import UseStateValue from './StateProvider';

function SidebarChat({ id, name, addNewChat }) {
    const [seed, setseed] = useState('');
    const [message, setmessage] = useState('');
    useEffect(() => {
        if (id) {
            db.collection('rooms').doc(id).collection('Messages').orderBy('timestamp', 'desc').onSnapshot((snapshot) => setmessage(snapshot.docs.map((doc) => doc.data())))
        }
    })
    useEffect(() => {
        setseed(Math.floor(Math.random() * 5000));
    }, [])
    const addchat = () => {
        const roomname = prompt("Enter the name for chat");
        if (roomname) {
            db.collection('rooms').add({
                name: roomname
            })
        }
    }
    return !addNewChat ? (
        <Link to={`/rooms/${id}`}>
            <div className="sidebarChat">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
                <div class="sidebarchat__info">
                    <h2>{name}</h2>
                    <p>{message[0]?.message}</p>
                </div>
            </div>
        </Link>

    ) : (<div onClick={addchat}>
        <div class="sidebarChat">
            <h2>Add new chat</h2>
        </div>
    </div>

        )
}

export default SidebarChat
