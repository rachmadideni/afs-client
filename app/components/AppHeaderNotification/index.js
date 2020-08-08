import React from 'react';
import { Badge, IconButton } from '@material-ui/core';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { NotificationImportantOutlined, NotificationsActiveOutlined } from "@material-ui/icons";
import "./styles.scss";
const AppHeaderNotification = ({ count = 0, onClick, props }) => {
  return (
    <IconButton data-tut="tut-notif" size="small" onClick={onClick}>
      { count > 0 ? (
        <Badge invisible={false} color="primary" variant="dot" {...props}>
          <NotificationsActiveOutlined className="iconColor" />
        </Badge>
      ) : 
      <Badge invisible={true} color="primary" variant="dot" {...props}>
        <NotificationsActiveOutlined className="iconColor" />
      </Badge>
      }              
    </IconButton>
  );
};
export default AppHeaderNotification;
