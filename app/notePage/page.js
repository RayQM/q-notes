"use client"
import { useUserAuth } from "../utility/auth-context";
import { RedirectType, redirect } from "next/navigation";
const qNotes = () =>{
    const { user, gitHubSignIn, firebaseSignOut,gMailSignIn } = useUserAuth();

    const handleSignOut = () => {
        firebaseSignOut();
      };
    
    if(user){
        return(
        <main>
            <h1>QNotes</h1>
            <div><button onClick={handleSignOut}>sign out</button></div>
        </main>
    )
    }
    else{
       return redirect("/")
    }


    
}
export default qNotes;