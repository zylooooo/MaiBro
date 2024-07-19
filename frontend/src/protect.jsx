import { firebaseAuth } from "./service/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';

function Protect({ children }) {
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = firebaseAuth.onAuthStateChanged((user) => {
      if (!user) {
        navigate('/login');
      }
    });

    return unsubscribe; // Cleanup function to unsubscribe from the auth state listener
  }, [navigate]);

  return children;
}

export default Protect;