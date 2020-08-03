/**
 *
 * PageContent
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';

const GridStyled = styled(Grid)`
&& {
  flex-shrink:0;
  padding:50px 10px 0px 10px;
  min-height:90%;
  width:100vw;
  background-color:transparent;
  // overflow-y:auto;
  // flex-grow:1;
  // min-width:100%;
}`;

const GridItem = styled(Grid)`
  min-width:100%;
  padding:0px 5px 0px 5px;
  background-color:transparent;
  // maxHeight:'82vh',
  // overflowY:'auto',
  // padding:'15px 30px 0px 10px'
`

function PageContent(props) {    
  return (
    <GridStyled {...props}>
      <GridItem item>
        {props.children}
      </GridItem>
    </GridStyled>
  );
}

// PageContent.propTypes = {};

export default PageContent;
