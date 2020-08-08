import React from "react";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Slide,
  Typography
} from "@material-ui/core";

import BtnCustom from "components/BtnCustom";

const Transition = React.forwardRef((props, ref) => (
  <Slide direction="down" ref={ref} {...props} />
));

const DialogTourStart = props => {
  return (
    <Dialog
      open={props.open}
      TransitionComponent={Transition}
      onClose={props.onClose}>
        <DialogContent>
          <DialogContentText align="center">
            <Typography variant="body2" align="center">
            Hai selamat datang di AFS. apakah anda ingin menjalankan user guide?
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{ paddingRight:10,justifyContent:'center',alignItems: 'center', }}>
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