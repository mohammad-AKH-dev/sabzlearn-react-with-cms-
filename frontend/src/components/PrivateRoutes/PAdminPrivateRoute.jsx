import { useContext } from "react";
import AuthContext from "../../context/authContext";
import { useNavigate } from "react-router-dom";

export default function PAdminPrivateRoute({ children }) {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <>
        {
            authContext.userInfos.role === 'ADMIN' ? <>{children}</> : navigate('/login')
        }
      </>
  );
}
