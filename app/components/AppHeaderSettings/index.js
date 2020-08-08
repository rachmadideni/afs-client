import React from "react";
import { IconButton } from "@material-ui/core";
import { MoreVertSharp } from "@material-ui/icons"
import "./styles.scss";
const AppHeaderSettings = (props) => {
  return (
    <IconButton data-tut="tut-setting" size="small">
      <MoreVertSharp className="iconColor" />
    </IconButton>
  )
}

export default AppHeaderSettings;