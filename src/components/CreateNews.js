import React, { useState } from "react";
import { TextField, Button } from "@material-ui/core";

const CreateNews = (props) => {
   const [form, setForm] = useState({
      title: "",
      text: "",
      date: "",
   });

   const changeHandler = (e) => {
      const nowDate = new Date().toLocaleDateString();
      setForm({ ...form, [e.target.id]: e.target.value, date: nowDate });
   };

   const submitHandler = () => {
      if (form.title.trim() !== "" && form.text.trim() !== "") {
         props.addItem(form.title, form.text, form.date);
      }
   };

   return (
      <div>
         <h2>Добавить новость</h2>
         <TextField
            id="title"
            label="Заголовок"
            placeholder="Заголовок"
            fullWidth
            margin="normal"
            InputLabelProps={{
               shrink: true,
            }}
            variant="filled"
            onChange={changeHandler}
         />
         <TextField
            id="text"
            label="Текст статьи"
            placeholder="Текст статьи"
            fullWidth
            margin="normal"
            InputLabelProps={{
               shrink: true,
            }}
            variant="filled"
            onChange={changeHandler}
         />
         <Button variant="contained" onClick={submitHandler}>
            Добавить новость
         </Button>
      </div>
   );
};

export default CreateNews;
