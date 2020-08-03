/**
 *
 * NumberInput
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import {
  TextField
} from '@material-ui/core';

import NumberFormat from 'react-number-format';

function CustomInput(props) {
  return <TextField 
    type="number"
    color="secondary"
    fullWidth 
    variant="outlined"
    margin="dense" 
    style={{ 
      textAlign:'right',
      fontWeight:'bold'
    }}
    {...props} />;
}

function NumberInput(props) {
  const { onChange, value, ...otherProps } = props;
  return (
    <NumberFormat 
      thousandSeparator
      decimalSeparator="."
      decimalScale={2}
      customInput={CustomInput}
      isNumericString={false}
      value={value}
      onValueChange={ values => {
        const { value } = values;
        onChange(value);
      }} />
  );
}

NumberInput.propTypes = {
  onChange: PropTypes.func
};

export default NumberInput;