/**
 *
 * RadialProgress
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import { color } from '../../styles/constants';

const StyledCircular = styled(props => (
  <CircularProgress
    classes={{
      root: 'root',
      circle: 'circle',
    }}
    {...props}
  />
))`
  && {
    .root {
      transform: rotate(-90deg);
    }
    .circle {
      fill: ${color.lightGrey};
    }
  }
`;

const StyledGrid = styled(props => (
  <Grid
    classes={{
      root: 'root',
    }}
  >
    {props.children}
  </Grid>
))`
  && {
    &.root {
      // display:inline-flex;
      background-color: transparent;
      justify-content: center;
      align-items: center;
      position: absolute;
      left: -31;
    }
  }
`;

const StyledTypography = styled(Typography)`
  && {
    position: relative;
    left: -25px;
    font-size: 10px;
    font-weight: bold;
    color: ${color.black};
  }
`;

function RadialProgress(props) {
  const { currentstep, totalstep } = props;

  return (
    <>
      <StyledCircular {...props} />
      <StyledGrid {...props}>
        <StyledTypography>{`${currentstep}/${totalstep}`}</StyledTypography>
      </StyledGrid>
    </>
  );
}

RadialProgress.propTypes = {
  value: PropTypes.number.isRequired,
  currentstep: PropTypes.number.isRequired,
  totalstep: PropTypes.number.isRequired,
};

export default RadialProgress;
