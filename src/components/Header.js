import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import SignInPopup from "./SignInPopup";
import SignUpPopup from "./SignUpPopup";

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

const Header = ({ isAuth }) => {
   const classes = useStyles();
   const [openPopupSignIn, setOpenPopupSignIn] = useState(false);
   const [openPopupSignUp, setOpenPopupSignUp] = useState(false);

   const handleClickPopupSignIn = () => {
      if (!isAuth) {
         setOpenPopupSignIn(!openPopupSignIn);
      }
   };

   const handleClickPopupSignUp = () => {
      setOpenPopupSignUp(!openPopupSignUp);
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

               {isAuth ? (
                  <NavLink to="/logout" className={classes.link}>
                     <Button color="inherit">Выйти</Button>
                  </NavLink>
               ) : (
                  <>
                     <Button color="inherit" onClick={handleClickPopupSignIn}>
                        Вход
                     </Button>
                     <Button color="inherit" onClick={handleClickPopupSignUp}>
                        Регистрация
                     </Button>
                  </>
               )}

               <SignInPopup
                  handleClickPopup={handleClickPopupSignIn}
                  open={openPopupSignIn}
               />
               <SignUpPopup
                  handleClickPopup={handleClickPopupSignUp}
                  open={openPopupSignUp}
               />
            </Toolbar>
         </AppBar>
      </div>
   );
};

export default Header;
