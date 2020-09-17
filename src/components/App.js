import React, { useEffect } from "react";
import { connect } from "react-redux";
import { BrowserRouter, Switch, Redirect, Route } from "react-router-dom";
import Main from "../pages/Main";
import News from "../pages/News";
import Layout from "../hoc/Layout";
import Logout from "./Logout";
import { autoLogin } from "../store/actions/auth";

const App = (props) => {
   useEffect(() => {
      props.autoLogin();
   });

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

   if (props.isAuth) {
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

function mapStateToProps(state) {
   return {
      isAuth: !!state.auth.token,
   };
}

function mapDispatchToProps(dispatch) {
   return {
      autoLogin: () => dispatch(autoLogin()),
   };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
