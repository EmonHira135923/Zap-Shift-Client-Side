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
  updateProfile,
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

  // Update User
  const updateUser = (profile) => {
    return updateProfile(auth.currentUser, profile);
  };

  // On Auth Changed
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => {
      unSubscribe();
    };
  }, []);

  const authinfo = {
    user,
    loading,
    reg,
    signin,
    Signout,
    googleUser,
    updateUser,
  };
  return <Provider value={authinfo}>{children}</Provider>;
};

export default AuthContexts;
