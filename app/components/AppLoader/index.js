import React from 'react';
import Box from '@material-ui/core/Box';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import LinearProgress from '@material-ui/core/LinearProgress';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import './styles.scss';

const PROGRESS = [{
  title:"check ...",
  value:15
},{
  title:"menyimpan pengajuan",
  value:50
},{
  title:"Upload Dokumen",
  value:75
},{
  title:"selesai",
  value:100
},{
  title:"Error",
  value:200
}];

const AppLoader = ({
  type = 'circular',
  message = 'mohon tunggu',
  ...props
}) => {
  const [progressValue, setProgressValue] = React.useState(15);
  const renderProgress = () => {
    if (type === 'circular') {
      return <CircularProgress color="inherit" />;
    } else if (type === 'linear') {
      return (
        <Box display="flex" alignItems="center">
          <Box width="100%" className="innerBox">
            <Typography
              variant="body2"
              align="center"
              className="progressTitle">
              {PROGRESS.map(item => item.value === progressValue ? item.title : null )}
            </Typography>
            <LinearProgress
              color={progressValue < 101 ? "primary" : "secondary"}
              variant="determinate"
              value={progressValue}
            />
          </Box>
        </Box>
      );
    }
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
