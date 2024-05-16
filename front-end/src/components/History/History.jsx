import { useEffect, useState } from 'react';
import './History.css'


// const notes = ["first", "second", "third", "first", "second", "third", "first", "second", "third"];

const Note = ({title, selected, click}) =>{
    const className = selected ? 'selected' : '';
    return(
        <li className={className} onClick={click}>{title}</li>
    )
};


export default function History({setSelected, selectedNote}){
    const [titles, setTitles] = useState(["no Notes"]);

    useEffect( () => {
        const fetchNotesTitles = async ()=>{
            const requestOptions = {
                method: 'GET',
                credentials: 'include',
            };
    
            try {
                const response = await fetch(`http://localhost:5500/get-titles`, requestOptions);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setTitles(data)
            } catch (error) {
                console.log('There was an error with the fetch operation:', error);
            }
        }
        fetchNotesTitles()
    }, [])


    return(
        <div className="history">
            <ul className='notes-list'>
                {titles.map((title)=> <Note key={title} title={title} selected={selectedNote === title} click={() => setSelected(title)}></Note>)}
            </ul>
        </div>
    )
}


;