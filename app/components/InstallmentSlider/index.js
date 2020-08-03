/**
 *
 * InstallmentSlider
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Slider from '@material-ui/core/Slider';
import { color } from 'styles/constants';

const StyledSlider = styled(Slider).attrs({
  classes:{
    root:'root',
    thumb:'thumb',
    track:'track',
    rail:'rail',
    // mark:'mark',
    // markActive:'markActive'
  }
})`
&& {
  .root:{
    color:${color.green};
    height:8px;
  }
  .thumb {
    width:24px;
    height:24px;
    background-color:${color.white};
    border:4px solid currentColor;
    margin-top:-9px;
    margin-left:-12px;
    &:focus,&:hover,&$active:{
      boxShadow:inherit;
    }
  }
  .track {
    height:6px;
    border-radius:6px;
  }
  .rail {
    height:6px;
    border-radius:6px;
  }
  .mark {
    background-color: ${color.blue};
    height: 10px;
    width: 10px;
    margin-top: -3px;
    margin-left:-8px;
    border-radius:5px;
    opacity:0.4;
  },
  .markActive{
    opacity: 1;            
    background-color: current-color;
  },
}
`

function InstallmentSlider(props) {
  return <StyledSlider {...props} />;
}

InstallmentSlider.propTypes = {
  classes:PropTypes.object,
  value:PropTypes.number.isRequired,
  min:PropTypes.number.isRequired,
  max:PropTypes.number.isRequired,
  step:PropTypes.number.isRequired,
  onChangeCommitted:PropTypes.func.isRequired,
  disabled:PropTypes.bool,
};

export default InstallmentSlider;