"use client"
import { useUserAuth } from "../utility/auth-context";
import { RedirectType, redirect } from "next/navigation";
import NavbarComponent from "../component/navbar";
import NotesViewer from "../component/notesViewer";
import ConsoleBar from "../component/console";
import { useEffect,useState } from "react";
import { addNote, updateNote } from "../component/services/notes-service";
import { subscribeToNotes } from "../component/services/notes-service";
const qNotes = () =>{
    const {user} = useUserAuth();
   
    const [notes, setNotes] = useState([]);
    const [selectedNote, setSelectedNote] = useState("")

    useEffect(() => {
    const unsubscribe = subscribeToNotes(user,setNotes);
    return unsubscribe;
    }, []);
    const handleCreateNote = (user,note) => {
            addNote(user,note);
        };
    
    const handleEditNote = (user,note) =>{
        updateNote(user,note)

    }
    
    function handleSelectedNote (notes)
    {
        setSelectedNote(notes); 
        console.log(notes)
    }

    if(user){
        return(
        <main className=" flex flex-col">
            <NavbarComponent/>
            <NotesViewer notes={notes} handleSelectedNote={handleSelectedNote}/>
            <ConsoleBar 
            onCreateNote ={handleCreateNote}
            setSelectedNote={setSelectedNote}
            onEditNote = {handleEditNote}
            note={selectedNote}
            />
        </main>
    )
    }
    else{
       return redirect("/", RedirectType.push)
    }
}
export default qNotes;