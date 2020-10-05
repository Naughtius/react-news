import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { logout } from "../store/actions/auth";
import { useSnackbar } from "notistack";

const Logout = () => {
   const dispatch = useDispatch();
   const { enqueueSnackbar } = useSnackbar();
   const isAuth = useSelector((state) => state.auth.token);

   useEffect(() => {
      dispatch(logout());
   });

   useEffect(() => {
      if (!!isAuth) {
         enqueueSnackbar("Вы вышли из аккаунта!");
      }
   }, [isAuth, enqueueSnackbar]);

   return <Redirect to="/" />;
};

export default Logout;
