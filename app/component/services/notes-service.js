import {db} from "../../utility/firebase"
import React from "react";
import { format } from 'date-fns';

import {
    collection,
    deleteDoc,
    addDoc,
    updateDoc,
    getDoc,
    getDocs,
    setDoc,
    onSnapshot,
    query,
    doc,
    where,
  } from "firebase/firestore";

  export const addNote = async (user,notes) => {
    try {
      const docRef = await addDoc(collection(db,"users",user.uid, "notes"), notes);
      return docRef.id;
    } catch (error) {
      console.error("Error in addNotePost: ", error);
    }
  };

 
  export const subscribeToNotes = (user,onUpdate) => {

    try {
      const colRef = collection(db,"users",user.uid, "notes");
      // const q = query(colRef, where("date", ">", new Date())); // only get events that have not yet occurred
  
      return onSnapshot(colRef, (snapshot) => {
        const Notes = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log (Notes)
        Notes.forEach((event) => {
          event.date = event.date.toDate();
          event.date.setDate(event.date.getDate() + 1); // terrible hack to fix timezone issue, better solution is to use moment.js
        });
        onUpdate(Notes);
      });
    } catch (error) {
      console.error("Error in subscribeToEvents: ", error);
    }
  };


  export async function deleteNote(user, note) {
    try{
        const docRef = doc(db, "users", user.uid, "notes", note.id);
        await deleteDoc(docRef);
    }
    catch(err)
    {
        console.log(err);
    }
}


export async function updateNote(user, note)
{
      try{
        const docRef = doc(db, "users", user.uid, "notes", note.id); 
          await updateDoc(docRef, {
              title: note.title,
              content: note.content,
              date: note.date
          }); 
        }
        catch(err){
            console.log(err); 
        }
    
}

