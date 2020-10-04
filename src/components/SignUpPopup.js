import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../store/actions/auth";
import { useSnackbar } from "notistack";
import FormPopup from "./FormPopup";

const SignInPopup = (props) => {
   const { enqueueSnackbar } = useSnackbar();
   const dispatch = useDispatch();
   const regToken = useSelector((state) => state.auth.regToken);
	const formControls = useSelector((state) => state.auth.formControls);

   useEffect(() => {
      if (!!regToken) {
         enqueueSnackbar("Вы зарегестрировались!");
      }
	}, [regToken, enqueueSnackbar]);

   const registerHandler = () => {
      dispatch(
         auth(formControls.email.value, formControls.password.value, false)
      );
      props.handleClickPopup();
   };

   return (
      <FormPopup
         open={props.open}
         title="Регистрация"
         handleClickPopup={props.handleClickPopup}
         clickHandler={registerHandler}
      />
   );
};

export default SignInPopup;
