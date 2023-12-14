import React from "react";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { app } from "../firebase.config";
import { useDispatch } from "react-redux";
import { signInSuccess } from "./redux/user";

export default function GoogleAuth() {
  const dispatch = useDispatch();
  const handleGoogleSignIn = () => {
    //  Sign in with Google
    const auth = getAuth(app);
    const googleProvider = new GoogleAuthProvider();
    signInWithPopup(auth, googleProvider)
      .then((res) => {
        // console.log(res);
        // send it backend
        // need userName,email,and photoURL

        // const {user}={res.user.displayName,res.user.email,res.user.photoURL}
        const username = res.user.displayName;
        const email = res.user.email;
        const photoURL = res.user.photoURL;
        const user = {
          username,
          email,
          photoURL,
        };
        // send it backend
        fetch("http://localhost:5000/signup/google", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.success === true) {
              dispatch(signInSuccess(data));
            }
          })
          .catch((e) => console.log(e));
      })
      .catch((e) => console.log(e));
  };
  return (
    <button
      onClick={handleGoogleSignIn}
      className="p-4 bg-green-950 text-white uppercase font-semibold rounded-lg"
      type="button"
    >
      Continue With Google
    </button>
  );
}
