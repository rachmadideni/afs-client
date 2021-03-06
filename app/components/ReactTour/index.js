import React from "react";
import Tour from "reactour";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  Slide,
  Typography,
  Avatar,
  Card,
  CardContent,
  CardActions  
} from "@material-ui/core";

import BtnCustom from "components/BtnCustom";
import CSAvatar from "../../images/rsz_csavatar.jpg";
import "./styles.scss";

export const steps = [{
  selector:'[data-tut="tut-navigasi"]',
  content:'ini adalah Tab menu navigasi',
  position:'top',
  stepInteraction:false  
},{
  selector:'[data-tut="tut-pengajuan"]',
  content:'ini adalah menu untuk mengakses layanan di AFS. swipe kiri dan kanan untuk berpindah menu',
  position:'top'
},{
  selector:'[data-tut="tut-notif"]',
  content:'tombol ini digunakan untuk melihat pemberitahuan/notifikasi dari kami'
},{
  selector:'[data-tut="tut-setting"]',
  content:'tombol ini digunakan untuk merubah pengaturan aplikasi'
}];

const ReactTour = props => {      
  return (
    <Tour 
      steps={steps} 
      isOpen={props.isOpen}       
      showNavigation={true}
      showButtons={true}
      closeWithMask={true}
      showCloseButton={true}
      disableInteraction      
      CustomHelper={CustomHelper}
      maskSpace={0}      
      {...props} />
  );
  
}

const CustomHelper = ({ current, content, totalSteps, gotoStep, close }) => {
  return (
    <Card variant="outlined">
      <CardContent className="cardContent">
        <Avatar 
          src={CSAvatar}
          className="avatarBadge" />        
        <Typography variant="body2">
        {content}
        </Typography>        
      </CardContent>
      <CardActions className="cardActions">
        {current > 0 && <BtnCustom variant="outlined" size="small" color="primary" title="sebelumnya" onClick={()=>gotoStep(current-1)} />}
        {current < totalSteps -1 && <BtnCustom variant="outlined" size="small" color="primary" title="selanjutnya" onClick={()=>gotoStep(current+1)} />}
        {current === totalSteps -1 && <BtnCustom variant="outlined" size="small" color="primary" title="tutup" onClick={()=>close()}/>}
        
      </CardActions>
    </Card>
  )
}

export default ReactTour;