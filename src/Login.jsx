import React from "react";
import "./Login.css";
import { Button } from "@mui/material";
import { auth, provider } from "./firebase";
import { useStateValue } from "./StateProvider";
import { actionTypes } from "./reducer";
import { signInWithPopup, getAuth } from "firebase/auth";

function Login() {
  const { user, setUser } = useStateValue();

  const signIn = async () => {
    try {
      const result = await signInWithPopup(getAuth(), provider);
      setUser(result?.user);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="login">
      <img src="./kakao-talk.png" alt="" />

      <div className="login__text">
        <h1>Sign in to Kakaotalk made by practical dev</h1>
      </div>

      <Button onClick={signIn}>Sign in with Google</Button>
    </div>
  );
}

export default Login;
