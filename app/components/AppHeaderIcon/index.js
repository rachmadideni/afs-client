import React from "react";
import Avatar from "@material-ui/core/Avatar";
import "./styles.scss";

const AppHeaderIcon = (props) => {
  return <Avatar src={props.src} {...props} />
}

export default AppHeaderIcon;