import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { getNotes } from './services/notes-service';
import { useUserAuth } from '../utility/auth-context';

const NotesViewer = ({notes,handleSelectedNote}) =>{
   
    const formatDate = (notes) =>{
        const parsedDate = new Date(notes.date);
        const formattedDate = parsedDate.toLocaleDateString('en-CA', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        });
        return formattedDate;
      }
    return(
        <div  style={{ minHeight: "54.5dvh", maxHeight: "54.5dvh"}}  
        className="bg-secondary flex flex-row p-5 justify-center overflow-auto ">
            <div >
                <ul className='flex gap-5 flex-wrap'>{notes.map((notes)=>(
                    <li key={notes.id} className='border h-40 w-32' onClick={() => handleSelectedNote(notes)}>
                        <div >
                            <div className='text-black'>{notes.title}</div>
                            <div>{notes.content}</div>
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