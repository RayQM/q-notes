import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { Button } from 'react-bootstrap';
import { deleteNote } from './services/notes-service';
import { useUserAuth } from '../utility/auth-context';
import { updateNote } from './services/notes-service';
import { useState,useEffect } from 'react';
import formatDate from './dateFormat';
import classNames from 'classnames';


function ConsoleBar({onCreateNote,note,setSelectedNote,onEditNote,onSearchNote,onRefirshList,onDeleteNotes } ) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [content, setContent] = useState("");
  const { user} = useUserAuth();
  const [showAll , setShowAll] = useState(false)
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
  
  function deleteNoteFunc()
    { 
        onDeleteNotes(note)
        setSelectedNote();
        setTitle("");
        setContent("");
        setDate(""); 
       
    }

    function handleDeselect()
    {

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

  return (
    <form  onSubmit={handleSubmit}>
      <div className='flex flex-col bg-dark'style={{ maxHeight: "39.4dvh" }} > 
        <div className='flex justify-center'><Button variant="black" className={classNames('mt-3 text-white' ,{ invisible: showAll !== true })} onClick={handleAllNotes} >All Notes</Button></div>
        <div className='items-center flex flex-row sm:flex-col justify-center gap-2 px-20' style={{ minHeight: "33.4dvh" }}  >
            <div className='container mx-4 flex flex-row gap-5 '>
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
              <textarea className="form-control form-control-lg bg-secondary " rows="5" placeholder='New Note' required onChange={handleContentChange} value={content}></textarea>
            </div>
            
            <div className='flex flex-col sm:flex-col gap-5'>
                <Button variant="secondary" type='submit' >Save</Button>
                <Button variant="secondary" onClick={deleteNoteFunc} >Delete</Button>
            </div>
        </div>
      </div>
     
    </form>
    
  );
}

export default ConsoleBar;