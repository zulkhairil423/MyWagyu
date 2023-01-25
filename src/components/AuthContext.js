import React, { useContext, useState, useEffect } from "react";
import { auth, firestore } from "./Firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import Loading from "./Loading";

const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        setLoading(true);
        getDoc(doc(firestore, "users", user.uid))
          .then((userData) => {
            setRole(userData.data().role);
            setLoading(false);
          })
      } else {
        setUser(null);
        setRole("");
        setLoading(false);
      }
    });
  }, []);

  if(loading) {
    return <Loading/>
  }

  return (
    <AuthContext.Provider value={{ user, role}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
