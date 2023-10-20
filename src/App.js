import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import ResponsiveSearchContainer from './ResponsiveSearchContainer';
import Header from './common/Header';
import Credentials from './Credentials';
import Databases from './Databases';
import { useLocation, useNavigate, Navigate, Route, Routes } from "react-router-dom";
import CustomSnackbar from "./snackbar/CustomSnackbar";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import SignIn from './SignIn';
import SignUp from './SignUp';
import NotFound from './NotFound';
import Layout from './Layout';
function App() {
  let location = useLocation();
  const [pathname, setPathname] = useState('');
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

  useEffect(() => {
    console.log(location);
    setPathname(location.pathname);
  }, [location])
  return (
    <>
      {!['/sign-in', '/sign-up'].includes(pathname) && <Header></Header>}
      <Routes>
        <Route path="/sign-in" exact element={<SignIn />} />
        <Route path="/sign-up" exact element={<SignUp />} />
        <Route path="/search" exact element={<ResponsiveSearchContainer />} />
        <Route path="/credentials" exact element={<Credentials />} />
        <Route path="/databases" exact element={<Databases />} />
        <Route path="/layout" exact element={<Layout />} >
          <Route path="search" exact element={<ResponsiveSearchContainer />} />
          <Route path="credentials" exact element={<Credentials />} />
          <Route path="databases" exact element={<Databases />} />
        </Route>
        <Route path="/" exact element={<Navigate to="/search" />} />
        <Route path="*" exact element={<NotFound />} />
      </Routes>
      <CustomSnackbar />
    </>
  );

}

export default App;
