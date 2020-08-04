import React from 'react';
import Box from "@material-ui/core/Box";
import classNames from "classnames";
import "./styles.scss";

export default function AppBox(props){
  let boxClass = classNames({ 
    appBox:true, 
    transparent:props.transparent });  
  return (
    <Box className={boxClass} {...props} />
  )
}