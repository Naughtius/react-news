import React, { useState } from "react";
import { connect } from "react-redux";
import { auth } from "../store/actions/auth";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

const SignInPopup = (props) => {
   const [form, setForm] = useState({
      email: "",
      password: "",
   });

   const changeHandler = (e) => {
      setForm({ ...form, [e.target.type]: e.target.value });
   };

   const loginHandler = () => {
      props.auth(form.email, form.password);
      props.handleClickPopup();
   };

   const hasError = false;

   return (
      <Dialog
         open={props.open}
         onClose={props.handleClickPopup}
         aria-labelledby="form-dialog-title"
      >
         <DialogTitle id="form-dialog-title">Вход / Выход</DialogTitle>
         <DialogContent>
            <TextField
               error={hasError}
               autoFocus
               margin="dense"
               id="email"
               label="Email"
               type="email"
               fullWidth
               value={form.email}
               onChange={changeHandler}
            />
            <TextField
               error={hasError}
               margin="dense"
               id="password"
               label="Password"
               type="password"
               fullWidth
               value={form.password}
               onChange={changeHandler}
            />
         </DialogContent>
         <DialogActions>
            <Button onClick={props.handleClickPopup} color="primary">
               Cancel
            </Button>
            <Button onClick={loginHandler} color="primary">
               Войти
            </Button>
         </DialogActions>
      </Dialog>
   );
};

function mapStateToProps(state) {
   return {
      error: state.auth.error,
   };
}

function mapDispatchToProps(dispatch) {
   return {
      auth: (email, password) => dispatch(auth(email, password)),
   };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignInPopup);
