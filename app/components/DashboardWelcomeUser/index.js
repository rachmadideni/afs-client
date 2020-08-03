/**
 *
 * DashboardWelcomeUser
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import { color, typography } from '../../styles/constants';

const Wrapper = styled.div`
&& {
  flex:1;
  width:100%;
  border-radius:8px;
  padding:10px;
  background-color:${color.lightGrey};  
  margin-bottom:20px;
}`;

const AvatarStyled = styled(Avatar)`
&& {
  margin-right:15px;
}`;

const WelcomeMessage = styled(Typography)`
&& {
  font-family:${typography.fontFamily};
  // font-size:${typography.size.tiny};
  font-size:12px;
  color:${color.black};
  font-weight:bold;
  line-height:15px;
  white-space: pre-wrap;
}`;

function DashboardWelcomeUser(props) {
  const { imgProps, welcomeText, ...otherProps } = props;
  return (
    <Wrapper {...otherProps}>
      <Grid 
        container 
        wrap="nowrap" 
        justify="flex-start" 
        alignItems="center"
        >
        <AvatarStyled src={imgProps} />
        <WelcomeMessage>
          {welcomeText}
        </WelcomeMessage>
      </Grid>
    </Wrapper>
  );
}

DashboardWelcomeUser.propTypes = {
  imgProps:PropTypes.any,
  welcomeText:PropTypes.string
};

export default DashboardWelcomeUser;
