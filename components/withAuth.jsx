// import { auth } from "@/firebase/config";
// import { onAuthStateChanged } from "firebase/auth";
// import { useRouter } from "next/router";

// const WithAuth = (WrappedComponent) => {
//   return (props) => {
//     const router = useRouter();

//     useEffect(() => {
//       const unsubscribe = onAuthStateChanged(auth, (user) => {
//         if (!user) {
//           // If the user is not authenticated, redirect to the login page
//           router.push("/Login");
//         }
//       });

//       return () => unsubscribe(); // Clean up the event listener when the component unmounts
//     }, []);

//     // Render the wrapped component if the user is authenticated
//     return <WrappedComponent {...props} />;
//   };
// };

// export default WithAuth;
