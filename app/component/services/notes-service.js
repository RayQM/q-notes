import {db} from "../../utility/firebase"

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
  
      return onSnapshot(colRef, (snapshot) => {
        const Notes = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        
        Notes.forEach((event) => {
          event.date = event.date.toDate();
          event.date.setDate(event.date.getDate() + 1); 
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

    

