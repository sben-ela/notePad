import { useState } from "react"
import './Auth.css'



export default function Auth(){
    const [emailValue, SetEmailValue] = useState('');
    const [passwordValue, SetPasswordValue] = useState('');
    const [userNameValue, SetuserNameValue] = useState('');


    const emailHandler = (event) =>{
        SetEmailValue(event.target.value)
    }
    const passwordHandler = (event) =>{
        SetPasswordValue(event.target.value)
    }
    const userNameHandler = (event) =>{
        SetuserNameValue(event.target.value);
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
            <button className="auth-button"> Login </button>
            <button className="auth-button"> Register </button>

        </div>
    )
};