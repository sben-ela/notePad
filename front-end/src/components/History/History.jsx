import { useEffect, useState } from 'react';
import './History.css'


// const notes = ["first", "second", "third", "first", "second", "third", "first", "second", "third"];

const Note = ({title, selected, click}) =>{
    const className = selected ? 'selected' : '';
    return(
        <li className={className} onClick={click}>{title}</li>
    )
};


export default function History(){
    const [selectedNote, setSelected] = useState(null);
    const [notes, setNotes] = useState(["no Notes"]);

    useEffect( () => {
        const fetchNotes = async ()=>{
            const requestOptions = {
                method: 'GET',
                credentials: 'include',
            };
    
            try {
                const response = await fetch(`http://localhost:5500/get-notes`, requestOptions);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setNotes(data)
                console.log(data)
            } catch (error) {
                console.error('There was an error with the fetch operation:', error);
            }
        }
        fetchNotes()
    }, [])


    return(
        <div className="history">
            <ul className='notes-list'>
                {notes.map((note, index )=> <Note key={note} title={note} selected={selectedNote === index} click={() => setSelected(index)}></Note>)}
            </ul>
        </div>
    )
}


;