/**
 *
 * ButtonAvatar
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import IconButton from '@material-ui/core/IconButton';
import { color,typography } from '../../styles/constants';

const IconButtonStyled = styled(IconButton)`
&& {
  color:${color.green};
}
`

function ButtonAvatar(props) {
  const { iconProps, onClick } = props;
  return (    
      <IconButtonStyled edge="start" onClick={onClick}>
        {iconProps}      
      </IconButtonStyled>    
  );
}

ButtonAvatar.propTypes = {
  iconProps:PropTypes.element,
  onClick:PropTypes.func
};

export default ButtonAvatar;
