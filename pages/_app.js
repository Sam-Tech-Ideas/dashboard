import { auth } from "@/firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/router";
import { useEffect } from "react";

import "@/styles/globals.css";
import Sidebar from "../components/Sidebar";
import { Toaster } from "react-hot-toast";





function App({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        // If the user is not authenticated, redirect to the login page
        router.replace("/Login");
      }
    });

    return () => unsubscribe(); // Clean up the event listener when the component unmounts
  }, []);

  return (
  <>
    <Toaster />
      <Sidebar>
        <Component {...pageProps} />
      </Sidebar>
      </>
  
  );
}

export default App;



