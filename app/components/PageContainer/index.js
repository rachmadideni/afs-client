/**
 *
 * PageContainer
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import bggreen01 from '../../images/bg_green_1.png';
import bgAbstract from '../../images/182.jpg';

const GridWrapper = styled(Grid)`
&& {
  flex:1;
  // background-image: url(${bggreen01});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  height:100vh;
  align-items:center;
  // display:flex;
  // min-height:100%;
}`;

function PageContainer(props) {
  return (
    <GridWrapper {...props}>
      {props.children}
    </GridWrapper>
  );
}

// PageContainer.propTypes = {};

export default PageContainer;
