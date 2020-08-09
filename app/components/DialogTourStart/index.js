import React from "react";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  Slide,
  Typography,
  Avatar
} from "@material-ui/core";

import BtnCustom from "components/BtnCustom";
import CSAvatar from "../../images/rsz_csavatar.jpg";
import "./styles.scss";

const Transition = React.forwardRef((props, ref) => (
  <Slide direction="down" ref={ref} {...props} />
));

const DialogTourStart = props => {
  return (
    <Dialog
      open={props.open}
      TransitionComponent={Transition}
      onClose={props.onClose}
      className="dialog"
      classes={{
        paper:'dialogPaper'
      }}>
        <DialogContent className="dialogContent">
          <div className="avatarWrapper">
            <Avatar src={CSAvatar} />
          </div>
          <div>
            <DialogContentText>
              <Typography 
                variant="body2" 
                align="left" 
                className="dialogTypography">
                  Hai selamat datang di AFS. apakah anda ingin menjalankan user guide?
              </Typography>
            </DialogContentText>
          </div>
        </DialogContent>
        <DialogActions className="dialogActions">
          <BtnCustom 
            size="small"
            variant="outlined" 
            color="primary"
            onClick={props.onClickActionButton}
            title="YA" />
          <BtnCustom 
            size="small"
            variant="outlined" 
            color="primary"
            onClick={props.onRejectUserGuide}
            title="TIDAK" />
        </DialogActions>
    </Dialog>
  )
}

export default DialogTourStart;