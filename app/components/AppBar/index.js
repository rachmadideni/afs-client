import React from "react";
import AppBar from "@material-ui/core/AppBar";
import classNames from "classnames";
import "./styles.scss";

const CustomAppBar = (props) => {
  let appBarClass = classNames({
    appbar:true,
    whiteBg:props.color === "white"
  });
  return (
    <AppBar data="tut-notifikasi" className={appBarClass} {...props}>{props.children}</AppBar>
  );
}
export default CustomAppBar;