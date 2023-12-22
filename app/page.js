"use client"; 
import { useUserAuth } from "./utility/auth-context";

export default function Home() {

  const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();

  const handleSignIn = () => {
    gitHubSignIn();
  };

  const handleSignOut = () => {
    firebaseSignOut();
  };

  const testFunction = () =>{
    console.log("111111")
  }
  return (
    <main>
      User: {user?.displayName}
      <br />
      {user ? (
        <button onClick={handleSignOut}>Sign Out</button>
      ) : (
        <button onClick={handleSignIn}>Sign In</button>
      )}
     
    </main>
  );
}


