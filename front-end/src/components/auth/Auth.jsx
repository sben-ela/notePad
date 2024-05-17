import { useEffect, useState } from "react"
import './Auth.css'



export default function Auth(){
    const [emailValue, SetEmailValue] = useState('');
    const [passwordValue, SetPasswordValue] = useState('');
    const [error, setError] = useState(false);


    const emailHandler = (event) =>{
        SetEmailValue(event.target.value)
    }
    const passwordHandler = (event) =>{
        SetPasswordValue(event.target.value)
    }
    const showError = (message) =>{
        setError(message)
        setTimeout(()=>setError(null), [2000])
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
                throw await response.json()
            }
            const data = await response.json();
        } catch (error) {
    
            showError(error.error);
            console.log(error)
        }
    };
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
            <button className="auth-button" onClick={()=>{authHandler('login')}}> Login </button>
            <button className="auth-button" onClick={()=>{authHandler('register')}}> Register </button>
            {error && <div className='auth-error'>{error}</div>}

        </div>
    )
};