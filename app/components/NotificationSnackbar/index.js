/**
 *
 * NotificationSnackbar
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';
import MuiAlert from '@material-ui/lab/Alert';
import Slide from '@material-ui/core/Slide';

import { typography } from '../../styles/constants';

function NotificationSnackbar(props) {
  const {
    notificationType,
    open,
    onClose,
    message,
    hideDuration,
    verticalPos,
    ...otherProps
  } = props;

  const displayNotificationResultType = () => {
    if (notificationType === 'success') {
      return (
        <MuiAlert variant="filled" severity="success" style={{ width: '100%',lineHeight:1.2 }}>
          {message}
        </MuiAlert>
      );
    }
    if (notificationType === 'error') {
      return (
        <MuiAlert variant="filled" severity="error" style={{ width: '100%',lineHeight:1.2 }}>
          {message}
        </MuiAlert>
      );
    }
    if (notificationType === 'warning') {
      return (        
        <MuiAlert variant="filled" severity="warning" style={{ width: '100%',lineHeight:1.2 }}>
          {message}          
        </MuiAlert>        
      );
    }
    return false;
  };

  return (
    <Snackbar
      anchorOrigin={{
        vertical: verticalPos,
        horizontal: 'left',
      }}
      open={open}
      onClose={onClose}
      autoHideDuration={hideDuration}
      TransitionComponent={Slide}
      key={Slide.name}
      {...otherProps}
      style={{
        fontFamily: typography.fontFamily,
        fontSize: 10,
      }}
    >
      {displayNotificationResultType()}
    </Snackbar>
  );
}

NotificationSnackbar.propTypes = {
  notificationType: PropTypes.string,
  open: PropTypes.bool,
  onClose: PropTypes.func,
  message: PropTypes.string,
  hideDuration: PropTypes.number,
  verticalPos: PropTypes.string,
};

export default NotificationSnackbar;
