import { OPEN_POPUP_SIGN_IN, OPEN_POPUP_SIGN_UP } from "../actions/actionTypes";

const initialState = {
   openPopupSignIn: false,
   openPopupSignUp: false,
};

export default function authReducer(state = initialState, action) {
   switch (action.type) {
      case OPEN_POPUP_SIGN_IN:
         return {
            ...state,
            openPopupSignIn: action.openPopupSignIn,
         };
      case OPEN_POPUP_SIGN_UP:
         return {
            ...state,
            openPopupSignUp: action.openPopupSignUp,
         };
      default:
         return state;
   }
}
