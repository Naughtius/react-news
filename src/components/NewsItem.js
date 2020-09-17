import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { connect } from "react-redux";

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
            {props.isAdmin && props.isAuth ? (
               <div className={classes.removeIcon} onClick={props.removeItem}>
                  <CloseIcon />
               </div>
            ) : null}
            {props.isAdmin ? (
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

function mapStateToProps(state) {
   return {
      isAuth: !!state.auth.token,
      isAdmin: state.auth.isAdmin,
   };
}

export default connect(mapStateToProps)(NewsItem);
