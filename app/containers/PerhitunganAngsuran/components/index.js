import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { color } from 'styles/constants';

import Typography from '@material-ui/core/Typography';

const StyledHeaderText = styled(props=><Typography {...props} />)`
&& {
    font-size:14px;
    color:${color.subtleBlack};
    font-weight:bold;
    text-transform:capitalize;
}`;

const StyledItemText = styled(props=><Typography {...props} />)`
&& {
    font-size:14px;
    color:${color.green};
    font-weight:bold;
    // text-align:right;
    text-transform:capitalize;
}`;

function FormItemHeaderText(props){
    return <StyledHeaderText {...props} />
}

function FormItemText(props){
    return <StyledItemText {...props} />
}

export {
    FormItemHeaderText,
    FormItemText
}