import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import SignInPopup from "./SignInPopup";
import SignUpPopup from "./SignUpPopup";
import { useDispatch, useSelector } from "react-redux";
import { openPopupSignIn, openPopupSignUp } from "../store/actions/popup";

const useStyles = makeStyles((theme) => ({
   root: {
      flexGrow: 1,
   },
   title: {
      flexGrow: 1,
   },
   link: {
      textDecoration: "none",
      color: "#fff",
   },
}));

const Header = () => {
   const classes = useStyles();
   const dispatch = useDispatch();
   const isAuth = useSelector((state) => state.auth.token);
   const hasOpenPopupSignIn = useSelector(
      (state) => state.popup.openPopupSignIn
   );
   const hasOpenPopupSignUp = useSelector(
      (state) => state.popup.openPopupSignUp
   );

   const popupSignInClickHandler = () => {
      if (!isAuth) {
         dispatch(openPopupSignIn(!hasOpenPopupSignIn));
      }
   };

   const popupSignUpClickHandler = () => {
      dispatch(openPopupSignUp(!hasOpenPopupSignUp));
   };

   return (
      <div className={classes.root}>
         <AppBar position="static">
            <Toolbar>
               <Typography variant="h6" className={classes.title}>
                  REACT NEWS
               </Typography>
               <NavLink to="/" className={classes.link}>
                  <Button color="inherit">Главная</Button>
               </NavLink>
               <NavLink to="/news" className={classes.link}>
                  <Button color="inherit">Новости</Button>
               </NavLink>

               {!!isAuth ? (
                  <NavLink to="/logout" className={classes.link}>
                     <Button color="inherit">Выйти</Button>
                  </NavLink>
               ) : (
                  <>
                     <Button color="inherit" onClick={popupSignInClickHandler}>
                        Вход
                     </Button>
                     <Button color="inherit" onClick={popupSignUpClickHandler}>
                        Регистрация
                     </Button>
                  </>
               )}

               <SignInPopup
                  handleClickPopup={popupSignInClickHandler}
                  open={hasOpenPopupSignIn}
               />
               <SignUpPopup
                  handleClickPopup={popupSignUpClickHandler}
                  open={hasOpenPopupSignUp}
               />
            </Toolbar>
         </AppBar>
      </div>
   );
};

export default Header;
