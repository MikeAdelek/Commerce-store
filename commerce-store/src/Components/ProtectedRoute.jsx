import { useContext, useEffect } from "react";
import { AuthContext } from "../utils/CartContext";
import { useLocation, useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isAuthenticated) {
      // save the current location
      navigate("/checkout", {
        state: { from: location.pathname }
      });
    }
  }, [isAuthenticated, navigate, location]);

  return isAuthenticated ? children : null;
};

export default ProtectedRoute;
