import React, { useEffect, useState } from "react";
import { Provider } from "./Provider";
import { auth } from "../utils/Firebase.config";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";

const googleProvider = new GoogleAuthProvider();

const AuthContexts = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Registration
  const reg = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Sign in
  const signin = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // signOut
  const Signout = () => {
    setLoading(true);
    return signOut(auth);
  };

  // Google signin
  const googleUser = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  // On Auth Changed
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => {
      unSubscribe();
      57677;
    };
  }, []);

  const authinfo = {
    user,
    loading,
    reg,
    signin,
    Signout,
    googleUser,
  };
  return <Provider value={authinfo}>{children}</Provider>;
};

export default AuthContexts;
