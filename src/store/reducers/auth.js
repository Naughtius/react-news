import {
   AUTH_LOGOUT,
   AUTH_SUCCESS,
   AUTH_ERROR,
   REG_SUCCESS,
   CHANGE_INPUT,
} from "../actions/actionTypes";

const initialState = {
   token: null,
   error: null,
   isAdmin: null,
   regToken: null,
   formControls: {
      email: {
         value: "",
         type: "email",
         label: "Email",
         errorMessage: "Введите корректный email",
         valid: false,
         touched: false,
         validation: {
            required: true,
            email: true,
         },
      },
      password: {
         value: "",
         type: "password",
         label: "Пароль",
         errorMessage: "Введите корректный пароль",
         valid: false,
         touched: false,
         validation: {
            required: true,
            minLength: 6,
         },
      },
   },
};

export default function authReducer(state = initialState, action) {
   switch (action.type) {
      case AUTH_ERROR:
         return {
            ...state,
            error: action.error,
         };
      case AUTH_SUCCESS:
         return {
            ...state,
            token: action.token,
            isAdmin: action.isAdmin,
            error: null,
         };
      case AUTH_LOGOUT:
         return {
            ...state,
            token: null,
            isAdmin: false,
            error: null,
         };
      case REG_SUCCESS:
         return {
            ...state,
            regToken: action.regToken,
            error: null,
         };
      case CHANGE_INPUT:
         return {
            ...state,
            formControls: {
               ...state.formControls,
               [action.fieldType]: {
                  ...state.formControls[action.fieldType],
                  value: action.value,
                  touched: true,
                  valid: validateControl(
                     action.value,
                     state.formControls[action.fieldType].validation
                  ),
               },
            }
         };
      default:
         return state;
   }
}

function validateEmail(email) {
   const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
   return regex.test(String(email).toLowerCase());
}

function validateControl(value, validation) {
   if (!validation) {
      return true;
   }

   let isValid = true;

   if (validation.required) {
      isValid = value.trim() !== "" && isValid;
   }

   if (validation.email) {
      isValid = validateEmail(value) && isValid;
   }

   if (validation.minLength) {
      isValid = value.length >= validation.minLength && isValid;
   }

   return isValid;
}
