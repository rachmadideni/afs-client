/**
 *
 * PaperCustom
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';

const StyledPaper = styled(props => (
  <Paper
    classes={{
      root:'root',
      rounded: 'rounded',
    }}
    {...props}
  />
))`

  &.root {
    margin-left:${props => props.marginLeft ? props.marginLeft : 0};
    margin-right:${props => props.marginRight ? props.marginRight : 0};
  }
  &.rounded {
    width:${props=>props.width ? props.width : 90}%;    
    border-radius: 12px;
    padding: 15px 20px 20px 20px;
  }
`;

const PaperCustom = props => {
  return <StyledPaper {...props} />;
};

// PaperCustom.propTypes = {};

export default PaperCustom;
