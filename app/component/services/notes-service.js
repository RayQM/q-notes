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

  export const addBlogPost = async (post) => {
    try {
      const docRef = await addDoc(collection(db, "blog-posts"), post);
      return docRef.id;
    } catch (error) {
      console.error("Error in addBlogPost: ", error);
    }
  };