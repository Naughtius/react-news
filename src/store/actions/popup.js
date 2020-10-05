import { OPEN_POPUP_SIGN_IN, OPEN_POPUP_SIGN_UP } from "./actionTypes";

export function openPopupSignIn(hasOpen) {
   return (dispatch) => {
      dispatch(openPopupSignInSuccess(hasOpen));
   };
}

export function openPopupSignUp(hasOpen) {
   return (dispatch) => {
      dispatch(openPopupSignUpSuccess(hasOpen));
   };
}

export function openPopupSignInSuccess(hasOpen) {
   return {
      type: OPEN_POPUP_SIGN_IN,
      openPopupSignIn: hasOpen,
   };
}

export function openPopupSignUpSuccess(hasOpen) {
   return {
      type: OPEN_POPUP_SIGN_UP,
      openPopupSignUp: hasOpen,
   };
}
