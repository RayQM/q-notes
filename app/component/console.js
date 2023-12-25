import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { Button } from 'react-bootstrap';
import { addNotePost } from './services/notes-service';
import { useUserAuth } from '../utility/auth-context';
function ConsoleBar() {
  const { user } = useUserAuth();

  if (!user) {
    return null;
  }
  return (
    <form onSubmit={async (e) => {
          e.preventDefault();
          const { title, content } = e.target.elements;
          await addNotePost({
            title: title.value,
            content: content.value,
          });
          title.value = "";
          content.value = "";
        }}>
      

      <div className='items-center bg-dark flex flex-row justify-center gap-4 px-20' style={{ minHeight: "39.4vh" }}  >
            <div className='container mx-4'>
              <input id="title" name="title" type="text" className=" form-control form-control-sm mb-4 " placeholder='Title'></input>
              <textarea className="form-control form-control-lg " rows="5" placeholder='New Note' id="content" name="content"></textarea>
            </div>
            
            <div className='flex flex-col gap-5'>
                <Button variant="secondary" type='submit'>Add</Button>
                <Button variant="secondary">Delete</Button>
            </div>
      </div>
    </form>
    
  );
}

export default ConsoleBar;