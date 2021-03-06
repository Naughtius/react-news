import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../store/actions/auth";
import { useSnackbar } from "notistack";
import FormPopup from "./FormPopup";

const SignInPopup = (props) => {
   const { enqueueSnackbar } = useSnackbar();
   const dispatch = useDispatch();
   const token = useSelector((state) => state.auth.token);
   const formControls = useSelector((state) => state.auth.formControls);

   useEffect(() => {
      if (!!token) {
         enqueueSnackbar("Вы авторизовались!");
      }
   }, [token, enqueueSnackbar]);

   const loginHandler = () => {
      dispatch(
         auth(formControls.email.value, formControls.password.value, true)
      );
      props.handleClickPopup();
   };

   return (
      <FormPopup
         open={props.open}
         title="Войти"
         handleClickPopup={props.handleClickPopup}
         clickHandler={loginHandler}
      />
   );
};

export default SignInPopup;
