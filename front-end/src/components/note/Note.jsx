import { useEffect, useState } from 'react'
import './Note.css'

export default function Note({selectedNote, isAuthenticated}){
    const [_title, setTitle] = useState('');
    const [_content, setContent] = useState('');
    const [error, setError] = useState(null);
    const [deleteNote, setDeleteNote] = useState(null);


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
    // const deleteNote = async ()=>{
            /// implement delete logic
    // }
    const saveNote = async() =>{
        try{
            if (!isAuthenticated)
                throw("You need to log in to save notes.")
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

    const clearContent = ()=>{
        setContent('');
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
        <div className={`note ${isAuthenticated ? 'note-auth' : ''}`}>
            <input className="note-title" placeholder='enter title here' value={_title} onChange={handleTitleChange}></input>
            <textarea className="note-content" value={_content} onChange={handleNoteChange}></textarea>
            <button className='save-button' onClick={saveNote}> Save </button>
            <button className='clear-button' onClick={clearContent} > clear </button>
            <button className='delete-button' onClick={()=>{setDeleteNote(true)}} > Delete </button>
            {deleteNote && <div className='delete-note'>
                <a> Are you sure you want to delete this note?<br></br> This action cannot be undone</a>
                <button className='cancel' onClick={()=>{setDeleteNote(false)}}> Cancel </button>    
                <button className='delete'onClick={deleteNote}> Delete </button>    
            </div>}
            {error && <div className='error'>{error}</div>}
        </div>
    )
};