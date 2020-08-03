/**
 *
 * PageFooter
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';

const GridStyled = styled(Grid)`
&& {
  // flex:1;
  margin-top:10;
  justify-content:center;
  align-items:center;
  flex-shrink:0;
}`;

function PageFooter(props) {
  const { navigationProp, ...gridProps } = props;
  return (
    <GridStyled 
      {...gridProps}>
      {navigationProp}
    </GridStyled>
  );
}

PageFooter.propTypes = {
  navigationProp:PropTypes.element
};

export default PageFooter;