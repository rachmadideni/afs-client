import React from "react";
import Toolbar from "@material-ui/core/Toolbar";
import "./styles.scss";

export default function CustomToolbar(props){
  return (
    <Toolbar className="toolbar" {...props}>{props.children}</Toolbar>
  )
}

