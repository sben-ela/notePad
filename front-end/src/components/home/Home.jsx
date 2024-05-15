import './Home.css'
import Auth from '../auth/Auth'
import Note from '../note/Note'
import History from '../History/History'
import Particle from '../Particle/Particle'

export default function Home(){
    return (
        <div className="container">
            <Particle></Particle>
            <Auth></Auth>
            <Note></Note>
            <History></History>
        </div>
    )
};