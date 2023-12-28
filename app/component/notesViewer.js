import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { getNotes } from './services/notes-service';
import { useUserAuth } from '../utility/auth-context';
import formatDate from './dateFormat';
import { Button } from 'react-bootstrap';
const NotesViewer = ({notes,handleSelectedNote}) =>{
    return(
        <div  style={{ minHeight: "54.5dvh", maxHeight: "54.5dvh"}}  
        className="bg-secondary flex flex-row p-4 justify-center overflow-auto ">
            <div >
                <ul className='flex gap-6 flex-wrap'>{notes.map((notes)=>(
                    <li key={notes.id} 
                    className='rounded-4 w-40 bg-dark text-white ' 
                    onClick={() => handleSelectedNote(notes)}>
                        <div className='hover:bg-sky-700 rounded-4'>
                            <h5 className='text-center text-capitalize '>{notes.title}</h5>
                            <div style={{minHeight:"17dvh", maxHeight:"17dvh"  ,wordBreak: "break-word"}} className="flex flex-wrap text-left p-3 overflow-hidden">{notes.content}</div>
                            <div className='text-center text-sm pt-2'>{formatDate(notes)}</div>
                        </div>
                    </li>
                ))}
                </ul>
            </div>
        </div>
    )
}

export default NotesViewer;