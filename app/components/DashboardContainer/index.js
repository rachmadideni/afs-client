/**
 *
 * DashboardContainer
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';

const GridContainer = styled(Grid)`
&& {
  justify-content:center;
  align-items:center;
  // height:82vh;
  padding-bottom:5px;
  padding-left:10px;
}`;

function DashboardContainer(props) {
  return (
    <GridContainer {...props}>
      {props.children}
    </GridContainer>
  );
}

/*
backend.js:6 Warning: Failed prop type: Invalid prop `children` of type `array` supplied to `DashboardContainer`, expected a single ReactElement.
*/

DashboardContainer.propTypes = {
  // children:PropTypes.element
  children: PropTypes.node.isRequired,
};

export default DashboardContainer;
