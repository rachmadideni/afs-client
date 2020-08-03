/**
 *
 * DashboardButton
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import { color, typography } from '../../styles/constants';

const ButtonStyled = styled(Button)`
&& {
  margin-top:10px; 
  margin-right:10px; 
  // margin-bottom:5px; 
  // box-shadow:none;
  text-transform:capitalize;
  font-family:${typography.fontFamily};
  font-size:${typography.size.medium}px;
  font-weight:bold;
}`;

function DashboardButton(props) {
  const { text, ...otherProps } = props;
  return (
    <ButtonStyled 
      {...otherProps}>
        {text}
    </ButtonStyled>
  );
}

// DashboardButton.propTypes = {};

export default DashboardButton;
