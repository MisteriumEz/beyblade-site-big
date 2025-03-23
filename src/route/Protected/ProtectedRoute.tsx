import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../firebaseConfig";

const ProtectedRoute: React.FC = () => {
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        localStorage.setItem("user", JSON.stringify(currentUser));
      } else {
        localStorage.removeItem("user");
      }
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <p>Carregando...</p>;
  }

  const storedUser = localStorage.getItem("user");
  return user || storedUser ? <Outlet /> : <Navigate to="/landing" replace />;
};

export default ProtectedRoute;
