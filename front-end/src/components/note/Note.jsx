import './Note.css'

export default function Note(){
    return (
        <div className="note">
            <input className="note-title" placeholder='enter title here '></input>
            <textarea className="note-content" ></textarea>
            <button className='save-button' > Save</button>
        </div>
    )
};