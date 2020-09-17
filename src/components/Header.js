import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { NavLink } from "react-router-dom";
import SignInPopup from "./SignInPopup";

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
   const [open, setOpenPopup] = useState(false);

   const handleClickPopup = () => {
      if (!isAuth) {
         setOpenPopup(!open);
      }
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
                  <Button color="inherit" onClick={handleClickPopup}>
                     Войти
                  </Button>
               )}

               <SignInPopup handleClickPopup={handleClickPopup} open={open} />
            </Toolbar>
         </AppBar>
      </div>
   );
};

export default Header;
