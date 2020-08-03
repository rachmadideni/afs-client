/**
 *
 * PageHeader
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';


const AppBarStyled = styled(AppBar)`
&& {
  background-color:transparent;
  box-shadow:none;
}  
`


function PageHeader(props) {
  const { titleProps, avatarProps} = props;
  return (
    <AppBarStyled>
      <Toolbar>
      {/* <div style={{ flexGrow:1 }} />       */}
      {titleProps}
      {/* <div style={{ flexGrow:1 }} />       */}
      {avatarProps}
      
      </Toolbar>
    </AppBarStyled>
  );
}
/*
<PageHeader 
  brandProps={<SvgLogo />}
  titleProps={<PageTitle variant="subtitle1" />}
  avatarProps={<ButtonAvatar iconProps={<UserAvatarIcon />} />} />
*/

PageHeader.propTypes = {
  brandProps:PropTypes.element,
  titleProps:PropTypes.element,
  avatarProps:PropTypes.element
};

export default PageHeader;
