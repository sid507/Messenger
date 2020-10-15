import React from 'react';
import { Button } from '@material-ui/core';
import './Login.css';
import { auth, provider } from './firebase';
import { actionTypes } from './Reducer';
import { useStateValue } from './StateProvider';



function Login() {
    const [{ }, dispatch] = useStateValue();
    const signIn = () => {
        auth.signInWithPopup(provider).then(result => dispatch({
            type: actionTypes.SET_USER,
            user: result.user,
        })).catch(error => alert(error.message));
    }
    return (
        <div className="login">
            <img src="https://whatsappbrand.com/wp-content/themes/whatsapp-brc/images/WhatsApp_Logo_1.png">

            </img>
            <h1> Welcome To WhatsAPP</h1>
            <Button type="submit" onClick={signIn}>Sign In with Google </Button>

        </div>
    )
}

export default Login
