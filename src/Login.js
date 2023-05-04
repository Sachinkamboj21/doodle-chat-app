// import React, { useReducer } from 'react'
import "./Login.css"
import { Button } from '@mui/material'
import { auth, provider } from './firebase'
import { signInWithPopup } from 'firebase/auth'
import { useStateValue } from './StateProvider'
import  { actionTypes } from './reducer'

function Login() {
    // const [{}, dispatch] =useStateValue();
    const [state, dispatch] = useStateValue();

    console.log(state);
    // const dispatch = useStateValue();
    // const dispatch = useReducer(reducer);

    const signin=()=>{
        signInWithPopup(auth, provider)
        .then((result)=>{
            dispatch({
                type: actionTypes.SET_USER,
                user: result.user
            })
        })
        .catch((error)=>{console.log(error.message)})
    }

  return (
    <div className='login'>
        <div className="login__container">
            <img src="../Whatsapp Logo transparent.png" alt="logo" />
            <div className="login__text">
                <h1>SignIN to Whatsapp</h1>
            </div>
            <Button onClick={signin} variant="contained" /*color="success"*/>SignIN with Google</Button>
        </div>
    </div>
  )
}

export default Login
