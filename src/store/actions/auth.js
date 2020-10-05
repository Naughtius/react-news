import axios from "axios";
import {
   AUTH_SUCCESS,
   AUTH_LOGOUT,
   AUTH_ERROR,
   REG_SUCCESS,
   CHANGE_INPUT,
} from "./actionTypes";

export function auth(email, password, isLogin) {
   return async (dispatch) => {
      const authData = {
         email,
         password,
         returnSecureToken: true,
      };

      let url =
         "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDiLsWZjND1SxfBizYwcKDUzeIlDxQ503M";

      if (!isLogin) {
         url =
            "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDiLsWZjND1SxfBizYwcKDUzeIlDxQ503M";
      }

      await axios
         .post(url, authData)
         .then((response) => {
            const data = response.data;

            if (!isLogin) {
               dispatch(regSuccess(data.idToken));
            }

            if (data.registered) {
               const expirationDate = new Date(
                  new Date().getTime() + data.expiresIn * 1000
               );

               let isAdmin = false;
               if (data.email === "admin@gmail.com") {
                  isAdmin = true;
                  localStorage.setItem("isAdmin", isAdmin);
               }

               localStorage.setItem("token", data.idToken);
               localStorage.setItem("localId", data.localId);
               localStorage.setItem("expirationDate", expirationDate);
               localStorage.setItem("email", email);

               dispatch(authSuccess(data.idToken, isAdmin));
               dispatch(autoLogout(data.expiresIn));
            }
         })
         .catch((error) => {
            dispatch(authError(error.response.data.error.message));
         });
   };
}

export function onChangeHandler(type, value) {
   return (dispatch) => {
      dispatch(changeInput(type, value));
   };
}

export function autoLogout(time) {
   return (dispatch) => {
      setTimeout(() => {
         dispatch(logout());
      }, time * 1000);
   };
}

export function logout() {
   localStorage.removeItem("token");
   localStorage.removeItem("localId");
   localStorage.removeItem("expirationDate");
   localStorage.removeItem("email");
   localStorage.removeItem("isAdmin");

   return {
      type: AUTH_LOGOUT,
   };
}

export function autoLogin() {
   return (dispatch) => {
      const token = localStorage.getItem("token");
      const isAdmin = localStorage.getItem("isAdmin");
      if (!token) {
         dispatch(logout());
      } else {
         const expirationDate = new Date(
            localStorage.getItem("expirationDate")
         );
         if (expirationDate <= new Date()) {
            dispatch(logout());
         } else {
            dispatch(authSuccess(token, isAdmin));
            dispatch(
               autoLogout(
                  (expirationDate.getTime() - new Date().getTime()) / 1000
               )
            );
         }
      }
   };
}

export function authError(error) {
   return {
      type: AUTH_ERROR,
      error
   };
}

export function authSuccess(token, isAdmin) {
   return {
      type: AUTH_SUCCESS,
      token,
      isAdmin,
   };
}

export function regSuccess(regToken) {
   return {
      type: REG_SUCCESS,
      regToken,
   };
}

export function changeInput(type, value) {
   return {
      type: CHANGE_INPUT,
      fieldType: type,
      value: value,
   };
}
