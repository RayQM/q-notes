'use client'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { Button } from 'react-bootstrap';
import { deleteNote } from './services/notes-service';
import { useUserAuth } from '../utility/auth-context';
import { updateNote } from './services/notes-service';
import { useState,useEffect } from 'react';
import formatDate from './dateFormat';
import classNames from 'classnames';
import { useSelector,useDispatch } from 'react-redux';
import { setShowBarToFalse,setShowBarToTrue } from '../Redux/feature/controlBar/controlBar';

function ConsoleBar({onCreateNote,note,setSelectedNote,onEditNote,onSearchNote,onRefirshList,onDeleteNotes } ) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [content, setContent] = useState("");
  const { user} = useUserAuth();
  const [showAll , setShowAll] = useState(false)
  const show = useSelector((state) => state.controlBar.show)
  const dispatch = useDispatch()


  useEffect(
    () => {
        if(note){
            setTitle(note.title);
            setContent(note.content );
            setDate(formatDate(note))
        }
        else
        {
            setTitle("");
            setContent("");
            setDate(""); 
        }
    },
    [note]
)
 
const handleSubmit = (event) => {
  event.preventDefault();

  if(note && note.id)
  {   
    const newNote = {
      id:note.id,
      title,
      date:new Date(date),
      content, 
    }; 
    console.log(newNote)
    onEditNote(user,newNote)

  }
  else{
    const newNote = {
    title,
    date: new Date(date),
    content, 
  }; 
  onCreateNote(user,newNote);
  };
  setSelectedNote();
  
};

   

  

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };
  
  function deleteNoteFunc()
    {   const newNote = {
      id:note.id,
      title,
      date:new Date(date),
      content, 
    }; 
        onDeleteNotes(user,newNote)
        setSelectedNote();
       
    }

    
   const handleSearchNote = () =>{
    onSearchNote(date)
    setShowAll(true)
   }

   const handleAllNotes= () =>{
    onRefirshList()
    setShowAll(false)
   }

   const test = () =>{
     
      dispatch(setShowBarToTrue())
      console.log(show)
   }

  return (
    
    <form  onSubmit={handleSubmit} >
      <div className='flex justify-center bg-dark'>
          <Button className={classNames('border-dark bg-dark',{ invisible: show !== false })} onClick={()=>test()}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" className="bi bi-arrow-bar-up " viewBox="0 0 16 16">
             <path fillRule="evenodd" d="M8 10a.5.5 0 0 0 .5-.5V3.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 3.707V9.5a.5.5 0 0 0 .5.5m-7 2.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13a.5.5 0 0 1-.5-.5" />
          </svg>
          </Button>
          <Button variant="black" className={classNames('mt-3 text-white' ,{ invisible: showAll !== true })} onClick={handleAllNotes} >All Notes</Button>
          <Button className={classNames('border-dark bg-dark',{ invisible: show !== true })} onClick={() => dispatch(setShowBarToFalse())}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" className="bi bi-arrow-bar-down " viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M1 3.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13a.5.5 0 0 1-.5-.5M8 6a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 0 1 .708-.708L7.5 12.293V6.5A.5.5 0 0 1 8 6" />
            </svg>
          </Button>
        </div>
      <div className='flex flex-col bg-dark'  style={show ===true?{ minHeight: "32dvh" }:{minHeight:"0dvh"}} > 
        
        <div className={classNames('items-center flex flex-col sm:flex-row  justify-center gap-2 px-20', {hidden : show !== true})} style={{ minHeight: "33.4dvh" }}  >
            <div className='container mx-4 flex flex-col sm:flex-row gap-5 '>
              <div className='flex flex-col '>
                <input required onChange={handleTitleChange} value={title} className="bg-secondary form-control  mb-4 " placeholder='Title'/>
                <input
                  type="date"
                  required
                  onChange={handleDateChange}
                  value={date}
                  className="bg-secondary form-control  mb-4 "
                />
                <Button variant="secondary" onClick={handleSearchNote}>Search By Date</Button>
              </div>
              <textarea className="form-control form-control-lg bg-secondary focus-ring-light " rows="5" placeholder='New Note' required onChange={handleContentChange} value={content}></textarea>
             
            </div>
                <div className='flex flex-col  gap-5'>
                  <Button variant="secondary " className='w-28 h-14' type='submit' >Save</Button>
                  <Button variant="secondary " className='w-28 h-14' onClick={deleteNoteFunc} >Delete</Button>
                </div>
            </div>      
        </div>
     
    </form>
    
  );
}

export default ConsoleBar;