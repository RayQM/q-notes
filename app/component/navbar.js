"use client"
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { useUserAuth } from '../utility/auth-context'
import { Button } from 'react-bootstrap';
function NavbarComponent() {
    const { user,firebaseSignOut} = useUserAuth();
    
    const handleSignOut = () => {
        firebaseSignOut();
      };
    
    if(user){
        return (
    <Navbar className="bg-black ">
      <Container >
        <Navbar.Brand className='text-white'>Q Notes</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Button  variant="secondary" className='text-white' onClick={handleSignOut}>
            Signed in as: {user.displayName}
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
    }
    else{
        return redirect("/", RedirectType.push)
     }
      
}

export default NavbarComponent;