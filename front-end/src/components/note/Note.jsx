import { useEffect, useState } from 'react'
import './Note.css'

export default function Note({selectedNote}){
    const [_title, setTitle] = useState('');
    const [_content, setContent] = useState('');
    const [error, setError] = useState(null);

    const handleNoteChange = (event) =>{
        setContent(event.target.value);
    }
    const handleTitleChange = (event) =>{
        setTitle(event.target.value);
    }
    const showError = (message) =>{
        setError(message)
        setTimeout(()=>setError(null), [2000])
    }
    const saveNote = async() =>{
        let method = 'POST';
        let router = 'add-note';
        if (selectedNote === _title){
            method = 'PUT';
            router = 'update-note';        }
        const requestOptions = {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({
                title: _title,
                content: _content,
            })
        };
        try{
            if (_title == '' ){
                throw ("empty title");
            }
            const response = await fetch(`http://localhost:5500/${router}`, requestOptions);
            
            if (response.status == 409){
                throw("already used title 🥲");
            }
        }
        catch(error){
            showError(error);

        }
    }


    useEffect(()=>{
        const fetchNote = async()=>{
            const response = await fetch(`http://localhost:5500/get-one-note/${selectedNote}`, {method : 'GET', credentials : 'include'});
            const note = await response.json();
            setContent(note.content);
        }

        if (selectedNote != null){
            setTitle(selectedNote);
            fetchNote();
        }
    },[selectedNote])

    return (
        <div className="note">
            <input className="note-title" placeholder='enter title here' value={_title} onChange={handleTitleChange}></input>
            <textarea className="note-content" value={_content} onChange={handleNoteChange}></textarea>
            <button className='save-button' onClick={saveNote}> Save</button>
            <button className='clear-button' > clear</button>
            <button className='delete-button' > Delete</button>

            {error && <div className='error'>{error}</div>}
        </div>
    )
};