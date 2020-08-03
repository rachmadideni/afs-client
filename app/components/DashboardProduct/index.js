/**
 *
 * DashboardProduct
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { color, typography } from '../../styles/constants';

const Wrapper = styled(Grid)`
&& {
  padding-left:55px;
  padding-right:55px;
}`;

const TextAvailableProducts = styled(Typography)`
&& {
  font-family:${typography.fontFamily};
  font-size:${typography.size.small}px;
  text-transform:capitalize;
}`;

function DashboardProduct(props) {
  const { chooseProductText, productButtonProps } = props;
  return (
    <Wrapper item>
      <Grid 
        container 
        justify="center">
          <TextAvailableProducts>
            {chooseProductText}
          </TextAvailableProducts>
          {productButtonProps}
      </Grid>
    </Wrapper>
  );
}

// DashboardProduct.propTypes = {};

export default DashboardProduct;
