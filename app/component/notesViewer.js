import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { getNotes } from './services/notes-service';
import { useUserAuth } from '../utility/auth-context';
import formatDate from './dateFormat';
import { Button } from 'react-bootstrap';
import classNames from 'classnames';
 const NotesViewer = ({notes,handleSelectedNote}) =>{

    const [heightLight,setHeightLight] = useState(false)
    const [selectedNote,setSelectedNote] = useState("")

    const handleHeightLight = (note) =>{
        handleSelectedNote(note)
        if (notes.id = note.id )
        setHeightLight(true)
        setSelectedNote(note)
    }

    return(
        <div  style={{ minHeight: "54.5dvh", maxHeight: "54.5dvh"}}  
        className="bg-secondary flex flex-row p-4 justify-center overflow-auto ">
            <div >
                <ul className='flex gap-6 flex-wrap justify-center'>{notes.map((note)=>(
                    <li key={note.id} 
                    className={classNames('rounded-4 w-40 bg-dark text-white focus-ring-light ', {"ring ring-offset-2" : heightLight !==false && note.id === selectedNote.id})}
                    onClick={() => handleHeightLight(note)}
                    >
                    
                        <div className='hover:bg-sky-700 rounded-4'>
                            <h5 className='text-center text-capitalize '>{note.title}</h5>
                            <div style={{minHeight:"17dvh", maxHeight:"17dvh"  ,wordBreak: "break-word"}} className="flex flex-wrap text-left p-3 overflow-hidden">{note.content}</div>
                            <div className='text-center text-sm pt-2'>{formatDate(note)}</div>
                        </div>
                    </li>
                ))}
                </ul>
            </div>
        </div>
    )
}

export default NotesViewer;