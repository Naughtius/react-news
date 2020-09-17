import { AUTH_LOGOUT, AUTH_SUCCESS, AUTH_ERROR } from "../actions/actionTypes";

const initialState = {
   token: null,
   error: null,
   isAdmin: null,
};

export default function authReducer(state = initialState, action) {
   switch (action.type) {
      case AUTH_SUCCESS:
         return {
            ...state,
            token: action.token,
            isAdmin: action.isAdmin,
            error: null,
         };
      case AUTH_ERROR:
         return {
            ...state,
            error: action.error,
         };
      case AUTH_LOGOUT:
         return {
            ...state,
            token: null,
            isAdmin: false,
            error: null,
         };
      default:
         return state;
   }
}
