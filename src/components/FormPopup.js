import React from "react";
import {
   Button,
   Dialog,
   DialogActions,
   DialogContent,
   DialogTitle,
   TextField,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { onChangeHandler } from "../store/actions/auth";

const FormPopup = (props) => {
   const dispatch = useDispatch();
   const formControls = useSelector((state) => state.auth.formControls);

   const changeHandler = (e) => {
      dispatch(onChangeHandler([e.target.type], e.target.value));
   };

   const renderInputs = () => {
      return Object.keys(formControls).map((item, index) => {
         const {
            label,
            value,
            type,
            valid,
            touched,
            errorMessage,
         } = formControls[item];

         return (
            <TextField
               autoFocus={index === 0 ? true : false}
               margin="dense"
               id={type}
               label={label}
               type={type}
               fullWidth
               key={index}
               value={value}
               onChange={changeHandler}
               helperText={!valid && touched ? errorMessage : null}
               error={!valid && touched}
            />
         );
      });
   };

   const inputs = renderInputs();
   return (
      <Dialog
         open={props.open}
         onClose={props.handleClickPopup}
         aria-labelledby="form-dialog-title"
      >
         <DialogTitle id="form-dialog-title">{props.title}</DialogTitle>
         <DialogContent>{inputs}</DialogContent>
         <DialogActions>
            <Button onClick={props.handleClickPopup} color="primary">
               Cancel
            </Button>
            <Button
               onClick={props.clickHandler}
               color="primary"
               disabled={props.isFormValid}
            >
               {props.title}
            </Button>
         </DialogActions>
      </Dialog>
   );
};

export default FormPopup;
