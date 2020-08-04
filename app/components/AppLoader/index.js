import React from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import './styles.scss';

const AppLoader = ({ type = 'circular', message = 'mohon tunggu', ...props }) => {
  const renderProgress = () => {
    if (type === 'circular') {
      return <CircularProgress color="inherit" />;
    } else null;
  };
  return (
    <Backdrop className="backdrop" {...props}>
      <Grid container className="gridBackdrop" direction="column">
        <Typography variant="body1" gutterBottom>
          {message}
        </Typography>
        {renderProgress()}
      </Grid>
    </Backdrop>
  );
};

export default AppLoader;
