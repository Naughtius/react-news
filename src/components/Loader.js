import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
   root: {
      display: "flex",
      justifyContent: "center",
      marginTop: "50px",
   },
}));

const Loader = () => {
   const classes = useStyles();

   return (
      <div className={classes.root}>
         <CircularProgress />
      </div>
   );
};

export default Loader;
