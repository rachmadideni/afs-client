import React from "react";
import styled from "styled-components";
import Grid from '@material-ui/core/Grid';
import Backdrop from '@material-ui/core/Backdrop';
import Typography from '@material-ui/core/Typography';

import { color, typography } from "../../styles/constants";

const StyledBackdrop = styled(props => <Backdrop classes={{ root:'root' }} {...props} />)`  
&.root {
  z-index:50000;
  background-color:${color.subtleBlack};
  opacity:0.7;
}
`;

const TourContentWrapper = styled(props => 
  <Grid classes={{ root:'root' }} {...props} />)`
    &.root {
      width:80%;
      position:absolute;
      top:100px;
    }  
`;

const TextInstructionHeader = styled(props=><Typography {...props}/>)`
  && {
    font-family:${typography.fontFamily};
    font-weight:bold;
    font-size:14px;
    line-height:1.2;
    color:${color.white};
  }
`;

const TextCloseTour = styled(props=><Typography {...props}/>)`
  && {
    font-family:${typography.fontFamily};
    font-weight:normal;
    font-size:12px;
    color:${color.white};
  }  
`;

export const TourOpening = ({ open, onTourClose }) => {
  console.log('open')
  return (
    <StyledBackdrop
      open={open}      
      onClick={onTourClose}
      style={{
        opacity:0.9
      }}>
        <Grid container wrap="nowrap" justify="center" alignItems="flex-start">
          <TourContentWrapper>
            <TextInstructionHeader variant="body1" align="center">
              tekan ikon panah di pojok kanan atas untuk berpindah ke step berikutnya
            </TextInstructionHeader>
          </TourContentWrapper>
          <Grid item>
            <TextCloseTour>
              ketuk layar untuk menutup pesan ini
            </TextCloseTour>
          </Grid>
        </Grid>
    </StyledBackdrop>
  )
}