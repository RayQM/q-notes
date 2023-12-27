import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { getNotes } from './services/notes-service';
import { useUserAuth } from '../utility/auth-context';
import formatDate from './dateFormat';
const NotesViewer = ({notes,handleSelectedNote}) =>{
    
    return(
        <div  style={{ minHeight: "54.5dvh", maxHeight: "54.5dvh"}}  
        className="bg-secondary flex flex-row p-5 justify-center overflow-auto ">
            <div >
                <ul className='flex gap-5 flex-wrap'>{notes.map((notes)=>(
                    <li key={notes.id} className='border h-40 w-32' onClick={() => handleSelectedNote(notes)}>
                        <div >
                            <div className='text-black text-center'>{notes.title}</div>
                            <div style={{minHeight:"10vh", maxWidth:"14vw", wordBreak: "break-word"}} className="flex flex-wrap text-left">{notes.content}</div>
                            <div>{formatDate(notes)}</div>
                        </div>
                    </li>
                ))}
                </ul>
            </div>
        </div>
    )
}

export default NotesViewer;