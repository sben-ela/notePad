import { useState } from 'react';
import './History.css'


const notes = ["first", "second", "third", "first", "second", "third", "first", "second", "third"];

const Note = ({title, selected, click}) =>{
    const className = selected ? 'selected' : '';
    return(
        <li className={className} onClick={click}>{title}</li>
    )
};


export default function History(){
    const [selectedNote, setSelected] = useState(null);


    return(
        <div className="history">
            <ul className='notes-list'>
                {notes.map((note, index )=> <Note key={note} title={note} selected={selectedNote === index} click={() => setSelected(index)}></Note>)}
            </ul>
        </div>
    )
}


