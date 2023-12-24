"use client"
import { useUserAuth } from "../utility/auth-context";
import { RedirectType, redirect } from "next/navigation";
import NavbarComponent from "../component/navbar";
import NotesViewer from "../component/notesViewer";
import ConsoleBar from "../component/console";
const qNotes = () =>{
    const { user} = useUserAuth();


    
    if(user){
        return(
        <main className=" flex flex-col">
            <NavbarComponent/>
            <NotesViewer/>
            <ConsoleBar />
           
        </main>
    )
    }
    else{
       return redirect("/", RedirectType.push)
    }
}
export default qNotes;