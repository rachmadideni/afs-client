import React from "react";
import AppBar from "@material-ui/core/AppBar";
import "./styles.scss";

const CustomAppBar = (props) => <AppBar className="appbar" {...props}>{props.children}</AppBar>;
export default CustomAppBar;