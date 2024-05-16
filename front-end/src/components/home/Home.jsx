import './Home.css'
import Auth from '../auth/Auth'
import Note from '../note/Note'
import History from '../History/History'
import Particle from '../Particle/Particle'
import { useEffect, useState } from 'react'




export default function Home(){

    const [isAuthenticated, setisAuthenticated] = useState(false);
    const [selectedNote, setSelected] = useState(null);

    useEffect( () => {
        const fetchState = async ()=>{
            const requestOptions = {
                method: 'GET',
                credentials: 'include',
            };
    
            try {
                const response = await fetch(`http://localhost:5500/authenticated`, requestOptions);
                if (response.ok) {
                    setisAuthenticated(true);
                }
            } catch (error) {
                console.log('There was an error with the fetch operation:', error);
            }
        }
        fetchState()
    }, [])
    return (
        <div className="container">
            <Particle></Particle>
            {!isAuthenticated && <Auth></Auth>}
            <Note selectedNote={selectedNote}></Note>
            <History  setSelected={setSelected} selectedNote={selectedNote}></History>
        </div>
    )
};