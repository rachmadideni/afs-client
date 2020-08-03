/**
 *
 * LoadingPage
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { color, typography } from 'styles/constants';

function LoadingPage() {
  return (
    // <Grid item xs>
      <Backdrop 
        open={true}
        invisible={false}      
        style={{
          zIndex:5000
        }}>
          <Grid 
            container 
            wrap="nowrap" 
            direction="column"
            justify="center"
            alignItems="center"
            style={{
              width:150,                    
            }}>
              <Typography 
                variant="body1"
                align="center"
                gutterBottom
                style={{
                  fontFamily:typography.fontFamily,
                  marginBottom:20,
                  color:color.white
                }}>
                  mohon tunggu                      
              </Typography>
              <CircularProgress color="primary" />
          </Grid>
      </Backdrop>
    // </Grid>
  );
}

LoadingPage.propTypes = {};

export default LoadingPage;
