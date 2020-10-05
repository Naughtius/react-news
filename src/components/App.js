import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Switch, Redirect, Route } from "react-router-dom";
import Main from "../pages/Main";
import News from "../pages/News";
import Layout from "../hoc/Layout";
import Logout from "./Logout";
import { autoLogin } from "../store/actions/auth";
import { useSnackbar } from "notistack";

const App = () => {
   const { enqueueSnackbar } = useSnackbar();
   const dispatch = useDispatch();
   const isAuth = useSelector((state) => state.auth.token);
   const error = useSelector((state) => state.auth.error);

   useEffect(() => {
      dispatch(autoLogin());
   });

   useEffect(() => {
      if (error) {
         enqueueSnackbar(error);
      }
	}, [error, enqueueSnackbar]);

   let routes = (
      <Switch>
         <Route path="/" exact>
            <Main />
         </Route>
         <Route path="/news" exact>
            <News />
         </Route>
         <Redirect to="/" />
      </Switch>
   );

   if (isAuth) {
      routes = (
         <Switch>
            <Route path="/logout">
               <Logout />
            </Route>
            <Route path="/" exact>
               <Main />
            </Route>
            <Route path="/news" exact>
               <News />
            </Route>

            <Redirect to="/" />
         </Switch>
      );
   }

   return (
      <BrowserRouter>
         <Layout>{routes}</Layout>
      </BrowserRouter>
   );
};

export default App;
