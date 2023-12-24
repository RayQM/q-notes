"use client"; 

import { useUserAuth } from "./utility/auth-context";

import { RedirectType, redirect } from "next/navigation";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
export default function Home() {

  const { user,gMailSignIn } = useUserAuth();

  const handleSignInWithGmail = () =>{
    gMailSignIn()
  }
if(user){
  return redirect("/notePage", RedirectType.push)
}
else{
  return(
    <main className=" flex flex-col justify-center items-center min-h-screen bg-black">        
      <Button variant="secondary" size="lg" onClick={handleSignInWithGmail}>sign with Gmail</Button>
    </main>
  )
}
  
}

