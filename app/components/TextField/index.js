import React from 'react';
import TextField from "@material-ui/core/TextField";
import "./styles.scss";

export default function CustomTextField(props){
  return (
    <TextField className="textField" {...props} />
  )
}
