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
    const authHandler = async (mission) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({
                email: emailValue,
                password: passwordValue,
            })
        };

        try {
            const response = await fetch(`http://localhost:5500/${mission}`, requestOptions);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
        } catch (error) {
            console.error('There was an error with the fetch operation:', error);
        }
    };

    return (
        !isLogin && <div className="input">
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
            <button className="auth-button" onClick={()=>{authHandler('login')}}> Login </button>
            <button className="auth-button" onClick={()=>{authHandler('register')}}> Register </button>

        </div>
    )
};