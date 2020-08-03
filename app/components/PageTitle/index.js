/**
 *
 * PageTitle
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import { typography } from '../../styles/constants';

const AppText = styled(Typography)`
&& {
  font-family:${typography.fontFamily};
  font-size:${typography.size.medium};
  font-weight:bold;
}  
`

function PageTitle(props) {
  return (
    <AppText {...props}>
      {props.title}
    </AppText>
  );
  
}

PageTitle.propTypes = {};

export default PageTitle;
