import { makeStyles } from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import Header from "../components/Header";

const useStyles = makeStyles(() => ({
   main: {
      padding: "0 40px 40px 40px",
   },
}));

const Layout = (props) => {
   const classes = useStyles();

   return (
      <>
         <Header isAuth={props.isAuth} />
         <main className={classes.main}>{props.children}</main>
      </>
   );
};

function mapStateToProps(state) {
   return {
      isAuth: !!state.auth.token,
   };
}

export default connect(mapStateToProps)(Layout);
