import { makeStyles } from "@material-ui/core";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Header from "../components/Header";
import { useSnackbar } from "notistack";

const useStyles = makeStyles(() => ({
   main: {
      padding: "0 40px 40px 40px",
   },
}));

const Layout = (props) => {
   const classes = useStyles();
   const { enqueueSnackbar } = useSnackbar();
   const error = useSelector((state) => state.auth.error);
   const isAuth = useSelector((state) => state.auth.token);

   useEffect(() => {
      if (error) {
         enqueueSnackbar(error);
      }
   }, [error, enqueueSnackbar]);

   return (
      <>
         <Header isAuth={!!isAuth} />
         <main className={classes.main}>{props.children}</main>
      </>
   );
};

export default Layout;
