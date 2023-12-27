import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { Button } from 'react-bootstrap';
import { deleteNote } from './services/notes-service';
import { useUserAuth } from '../utility/auth-context';
import { updateNote } from './services/notes-service';
import { useState,useEffect } from 'react';
import formatDate from './dateFormat';

function ConsoleBar({onCreateNote,note,setSelectedNote,onEditNote} ) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [content, setContent] = useState("");
  const { user} = useUserAuth();

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
  handleDeselect();
  };
  handleDeselect();
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
  
  function del()
    { 
        deleteNote(user, note);
        setSelectedNote();
        setTitle("");
        setContent("");
        setDate(""); 
       
    }

    function handleDeselect()
    {

      setSelectedNote();
    }

   

  return (
    <form  onSubmit={handleSubmit}>
      <div className='items-center bg-dark flex flex-row justify-center gap-2 px-20' style={{ minHeight: "39.4vh" }}  >
            <div className='container mx-4 flex flex-row gap-16 '>
              <div className='flex flex-col gap-11'>
                <input required onChange={handleTitleChange} value={title} className="bg-secondary form-control  mb-4 " placeholder='Title'/>
                <input
                  type="date"
                  required
                  onChange={handleDateChange}
                  value={date}
                  className="bg-secondary form-control  mb-4 "
                />
              </div>
              
              <textarea className="form-control form-control-lg bg-secondary " rows="5" placeholder='New Note' required onChange={handleContentChange} value={content}></textarea>
            </div>
            
            <div className='flex flex-col gap-5'>
                <Button variant="secondary" type='submit' >Save</Button>
                <Button variant="secondary" onClick={del} >Delete</Button>
            </div>
      </div>
    </form>
    
  );
}

export default ConsoleBar;