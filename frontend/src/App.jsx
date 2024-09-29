import { useRoutes } from "react-router-dom";
import AuthContext from "./context/authContext";
import routes from "./routes";
import "./App.css";
import { useCallback, useEffect, useState } from "react";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [token, setToken] = useState(null);
  const [userInfos, setUserInfos] = useState(false);

  const router = useRoutes(routes);

  const login = useCallback((userInfos, token) => {
    setToken(token);
    setIsLoggedIn(true);
    setUserInfos(userInfos);
    localStorage.setItem("user", JSON.stringify({ token }));
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setToken(null);
    setUserInfos({});
    localStorage.removeItem("user");
  },[])

  useEffect(() => {
    const localStorageData = JSON.parse(localStorage.getItem("user"));
    if (localStorageData) {
      fetch("http://localhost:4000/v1/auth/me",{
        method:'GET',
        headers: {
          'Authorization': `Bearer ${localStorageData.token}`,
        }
      }).then(res => res.json())
        .then(result => {
          console.log(result)
          setIsLoggedIn(true)
          setUserInfos(result)
          setToken(localStorageData.token)
        })
    }
  }, [login,isLoggedIn]);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        token,
        userInfos,
        login,
        logout,
      }}
    >
      {router}
    </AuthContext.Provider>
  );
}

export default App;
