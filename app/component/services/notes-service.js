import {db} from "../../utility/firebase"
import {
    collection,
    addDoc,
    getDoc,
    getDocs,
    setDoc,
    onSnapshot,
    query,
    doc,
    where,
  } from "firebase/firestore";

  export const addNotePost = async (post) => {
    try {
      const docRef = await addDoc(collection(db, "note-post"), post);
      return docRef.id;
    } catch (error) {
      console.error("Error in addNotePost: ", error);
    }
  };