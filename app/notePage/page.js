"use client"
import { useUserAuth } from "../utility/auth-context";
import { RedirectType, redirect } from "next/navigation";
import NavbarComponent from "../component/navbar";
import NotesViewer from "../component/notesViewer";
import ConsoleBar from "../component/console";
import { useEffect,useState } from "react";
import { addNote, updateNote } from "../component/services/notes-service";
import { subscribeToNotes } from "../component/services/notes-service";
import _ from "lodash"
import formatDate from "../component/dateFormat";
import { deleteNote } from "../component/services/notes-service";

const QNotes = () =>{
    const {user} = useUserAuth();
   
    const [notes, setNotes] = useState([]);
    const [selectedNote, setSelectedNote] = useState("")
    const [list,setList] = useState()

    
   
    const notesList = (Notes) =>{
        const notesList = Notes
        setNotes(notesList)
        setList(notesList)
    } 
    useEffect(() => {
    const unsubscribe = () =>{
        subscribeToNotes(user,notesList);
    }
     return () => unsubscribe()
    },[user]);

    const handleCreateNote = (user,note) => {
            addNote(user,note);
            subscribeToNotes(user,notesList);
        };
    
    const handleEditNote = (user,note) =>{
        updateNote(user,note)
        subscribeToNotes(user,notesList);
    }
    
    function handleSelectedNote (notes)
    {
        setSelectedNote(notes); 
        console.log(notes)
    }
   
    const handleSearchNote = (date) =>{
        const noteList = list.filter((notes) => formatDate(notes) === date)
        setNotes(noteList)
       
        
    }

    const handleAllNotes = () =>{
        subscribeToNotes(user,notesList);
    }
    const handleDeleteNotes = (note) =>{
        deleteNote(user, note);
        subscribeToNotes(user,notesList);
    }

    if(user){
        return(
        <main className=" flex flex-col">
            <NavbarComponent/>
            <NotesViewer notes={notes}  handleSelectedNote={handleSelectedNote}/>
            <ConsoleBar 
            onCreateNote ={handleCreateNote}
            setSelectedNote={setSelectedNote}
            onEditNote = {handleEditNote}
            note={selectedNote}
            onSearchNote = {handleSearchNote}
            onRefirshList = {handleAllNotes}
            onDeleteNotes = {handleDeleteNotes}
            />
        </main>
    )
    }
    else{
       return redirect("/", RedirectType.push)
    }
}
export default QNotes;