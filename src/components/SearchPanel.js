import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
   root: {
      display: "flex",
      flexWrap: "wrap",
      marginBottom: "30px",
   },
   textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: "25ch",
   },
}));

const SearchPanel = (props) => {
   const classes = useStyles();
   const [search, setSearch] = useState("");

   const onSearchChange = (e) => {
      const term = e.target.value;
      setSearch(term);
      props.onSearchChange(term);
   };

   return (
      <div className={classes.root}>
         <TextField
            id="outlined-full-width"
            label="Поиск"
            placeholder="Искать новость..."
            fullWidth
            margin="normal"
            InputLabelProps={{
               shrink: true,
            }}
            variant="outlined"
            value={search}
            onChange={onSearchChange}
         />
      </div>
   );
};

export default SearchPanel;
