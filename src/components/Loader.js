import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
   Loader: {
      display: "flex",
      justifyContent: "center",
      marginTop: "50px",
   },
}));

const Loader = () => {
   const classes = useStyles();

   return (
      <div className={classes.Loader}>
         <CircularProgress />
      </div>
   );
};

export default Loader;
