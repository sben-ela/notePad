import { Link } from 'react-router-dom'
import './Home.css'
import Auth from '../Auth/Auth'
import Note from '../note/Note'

export default function Home(){
    return (
        <div className="home">
            <Auth></Auth>
            <Note></Note>
        </div>
    )
};