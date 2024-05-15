import { useState } from "react"
import './Auth.css'



export default function Auth(){
    const [emailValue, SetEmailValue] = useState('');
    const [passwordValue, SetPasswordValue] = useState('');


    const emailHandler = (event) =>{
        SetEmailValue(event.target.value)
    }
    const passwordHandler = (event) =>{
        SetPasswordValue(event.target.value)
    }
    const authHandler = async () =>{
        try{
        const response = await fetch('localhost:5500/register', {
            method: 'Post',
            body: JSON.stringify({ email: emailValue, password: passwordValue }),
        });
        if (response.ok) {
            alert('Registration successful');
        } else {
            alert('Registration failed');
        }}
        catch(error){
            console.log(error);
        }
    }
    return (
        <div className="input">
            <input
                type="text"
                className="email"
                placeholder="email"
                onChange={emailHandler}
            ></input>
            <input
                type="password"
                className="password"
                placeholder="password"
                onChange={passwordHandler}
            ></input>
            <button className="auth-button" onClick={authHandler}> Login </button>
            <button className="auth-button" > Register </button>

        </div>
    )
};