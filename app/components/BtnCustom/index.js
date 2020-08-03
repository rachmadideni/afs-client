/**
 *
 * PrimaryBtn
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import { typography } from '../../styles/constants';

const StyledBtn = styled(props=>(
    <Button {...props} />
))`
  && {
    margin-top: 10px;
    margin-bottom:5px;
    font-family: ${typography.fontFamily};
    font-weight: bold;
    text-transform: capitalize;
    box-shadow: none;
  }`;

const BtnCustom = ({ title, ...btnProps }) => {
  return (
    <StyledBtn {...btnProps}>{title}</StyledBtn>
  );
}

BtnCustom.propTypes = {
  title:PropTypes.string.isRequired
};

export default BtnCustom;
