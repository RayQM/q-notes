"use client"; 
import { AuthCredential } from "firebase/auth";
import { useUserAuth } from "./utility/auth-context";
import Link from "next/link";
import { RedirectType, redirect } from "next/navigation";

export default function Home() {

  const { user, gitHubSignIn, firebaseSignOut,gMailSignIn } = useUserAuth();

 async function handleSignIn(){
    try{
      gitHubSignIn()
    }
    catch(err){
      console.log(err)
        }
 }

  const handleSignOut = () => {
    firebaseSignOut();
  };

  const handleSignInWithGmail = () =>{
    gMailSignIn()
  }
if(user){
  return redirect("/notePage")
  
}
else{
  return(
    <main>
      <div>
        <button onClick={handleSignInWithGmail}>sign with Gmail</button>
      </div>
    </main>
  )
}
  
}

