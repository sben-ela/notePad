import { Link } from 'react-router-dom'
import './Home.css'
import Auth from '../auth/Auth'
import Note from '../note/Note'
import History from '../History/History'
import Particle from '../Particle/Particle'

export default function Home(){
    return (
        <div className="home">
            <Particle></Particle>
            <Auth></Auth>
            <Note></Note>
            <History></History>
        </div>
    )
};