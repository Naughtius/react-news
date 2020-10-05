import { makeStyles } from "@material-ui/core";
import React from "react";
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
         <Header />
         <main className={classes.main}>{props.children}</main>
      </>
   );
};

export default Layout;
