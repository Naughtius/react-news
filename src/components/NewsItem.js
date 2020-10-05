import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardContent, Typography } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { useSelector } from "react-redux";

const useStyles = makeStyles({
   root: {
      minWidth: 275,
      marginBottom: "20px",
      position: "relative",
   },
   title: {
      fontSize: 20,
   },
   removeIcon: {
      position: "absolute",
      top: "16px",
      right: "16px",
      cursor: "pointer",
   },
   successIcon: {
      position: "absolute",
      top: "48px",
      right: "16px",
      cursor: "pointer",
      color: "red",
   },
   successIconActive: {
      color: "green",
   },
   pos: {
      marginTop: "30px",
      fontSize: "12px",
   },
});

const NewsItem = (props) => {
   const classes = useStyles();
   const isAuth = useSelector((state) => state.auth.token);
   const isAdmin = useSelector((state) => state.auth.isAdmin);

   const classesSuccess = [classes.successIcon];
   if (props.show) {
      classesSuccess.push(classes.successIconActive);
   }

   return (
      <Card className={classes.root}>
         <CardContent>
            <Typography
               className={classes.title}
               color="textSecondary"
               gutterBottom
            >
               {props.title}
            </Typography>
            <Typography variant="body2" component="p">
               {props.text}
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
               Дата создания: {props.date}
            </Typography>

            {isAdmin && isAuth ? (
               <div className={classes.removeIcon} onClick={props.removeItem}>
                  <CloseIcon />
               </div>
            ) : null}

            {isAdmin ? (
               <div
                  className={classesSuccess.join(" ")}
                  onClick={props.successNewsItem}
               >
                  <CheckCircleIcon />
               </div>
            ) : null}
         </CardContent>
      </Card>
   );
};

export default NewsItem;
