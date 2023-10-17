import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import ResponsiveSearchContainer from './ResponsiveSearchContainer';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { useNavigate, Redirect, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import SignIn from './SignIn';
import SignUp from './SignUp';
import NotFound from './NotFound';
function App() {
  const navigate = useNavigate();
  const { isLogedIn, user } = useSelector((state) => state.login);
  useEffect(() => {
    setTimeout(() => {
      let obj = { pathname: "/" };
      if (isLogedIn) {
        switch (user.userCategory) {
          case "super_admin": {
            obj.pathname = "/organizations";
            obj.userCategory = "Super Admin";
            break;
          }
          case "admin": {
            obj.pathname = "/projects";
            obj.userCategory = "Admin";
            break;
          }

        }
        if (obj.pathname) {
          if (navigate) {
            navigate({
              pathname: obj.pathname,
              state: obj,
            });
          }
        }
      }
    }, 300);
  }, [isLogedIn]);
  return (
    <Routes>
      <Route path="/sign-in" exact element={<SignIn />} />
      <Route path="/sign-up" exact element={<SignUp />} />
      <Route path="/search" exact element={<ResponsiveSearchContainer />} />
      <Route path="/" exact element={<Navigate to="/search" />} />
      <Route path="*" exact element={<NotFound />} />
    </Routes>
  );
}

export default App;
