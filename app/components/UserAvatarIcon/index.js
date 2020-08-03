/**
 *
 * UserAvatarIcon
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Avatar from '@material-ui/core/Avatar';
import { typography } from '../../styles/constants';

const AvatarStyled = styled(Avatar)`
&& {
  width:36px;
  height:36px;
  font-size:${typography.size.small}px;
  text-transform:uppercase;
}  
`

function UserAvatarIcon(props) {
  const name = props.title ? props.title : "U"; 
  return <AvatarStyled>{name}</AvatarStyled>;
}

UserAvatarIcon.propTypes = {
  title:PropTypes.string
};

export default UserAvatarIcon;
