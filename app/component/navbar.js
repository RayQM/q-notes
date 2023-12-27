"use client"
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { useUserAuth } from '../utility/auth-context'
import { Button } from 'react-bootstrap';
import React, { useState } from 'react';
function NavbarComponent() {
    const { user,firebaseSignOut} = useUserAuth();
    
    const handleSignOut = () => {
        firebaseSignOut();
      };
      

      
      const [buttonText, setButtonText] = useState(`Signed as: ${user.displayName}`);
    
      const handleMouseEnter = () => {
        setButtonText(`Sign out : ${user.displayName}`);
      };
    
      const handleMouseLeave = () => {
        setButtonText(`Signed in as: ${user.displayName}`);
      };
      
      
      
      
   
      
    if(user){
        return (
    <Navbar className="bg-dark">
      <Container >
        <Navbar.Brand className='text-white'>Q Notes</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          {/* ({hover? <Button  variant="secondary" className='text-white' onClick={handleSignOut}>
            Signed in as: {user.displayName}
          </Button>:<Button>Sign out: {user.displayName} </Button>}) */}
          <Button  variant="secondary" className='text-white' onClick={handleSignOut}  onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}>
           {buttonText}
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