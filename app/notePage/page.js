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
        subscribeToNotes(user,notesList)
    },[user]);

    const handleCreateNote = (user,note) => {
            addNote(user,note);
            subscribeToNotes(user,notesList)
        };
    
    const handleEditNote = async(user,note) =>{
        updateNote(user,note)
        await subscribeToNotes(user,notesList)
    }
    
    function handleSelectedNote (notes)
    {
        setSelectedNote(notes); 

    }
    const handleDiselectNote = () =>{
        const newNote = {
            id:"",
            title:"",
            date:new Date(),
            content:""
          }; 
        setSelectedNote(newNote); 
    }

    const handleSearchNote = (date) =>{
        const noteList = list.filter((notes) => formatDate(notes) === date)
        setNotes(noteList)
       
        
    }

    const handleAllNotes = () =>{
        subscribeToNotes(user,notesList);
    }
    const handleDeleteNotes = (user,note) =>{
        deleteNote(user, note);
       const noteList = list.filter((notes)=> notes.id !== note.id)
       setList(noteList)
       setNotes(noteList)
    }

    if(user){
        return(
        <main className=" flex flex-col">
            <NavbarComponent/>
            <NotesViewer notes={notes}  handleSelectedNote={handleSelectedNote}/>
            <ConsoleBar 
            onCreateNote ={handleCreateNote}
            setSelectedNote={handleDiselectNote}
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