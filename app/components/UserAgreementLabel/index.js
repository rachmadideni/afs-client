import React from "react";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import "./styles.scss";

const UserAgreementLabel = (props) => {
  return <FormControlLabel classes={{ label:"userAgreementLabel" }} {...props} />
}

export default UserAgreementLabel;