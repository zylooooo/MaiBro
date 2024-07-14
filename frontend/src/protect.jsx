import { firebaseAuth } from "./service/firebaseConfig";
import { useNavigate } from "react-router-dom";

function Protect({ children }) {
  const navigate = useNavigate();
  firebaseAuth.onAuthStateChanged((user) => {
    if (!user) {
      navigate("/login");
    }
  });

  return children;
}

export default Protect;