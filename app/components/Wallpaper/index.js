import React from 'react';
import Grid from '@material-ui/core/Grid';
import "./styles.scss";

const Wallpaper = props => {
  return (
    <Grid className="wallpaper" container wrap="nowrap" direction="column">
      {props.children}
    </Grid>
  );
};

export default Wallpaper;
