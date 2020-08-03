import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import styled from 'styled-components';

import RadialProgress from '../RadialProgress';

const Wrapper = styled(Grid)`
&& {
    flex:1;
    flex-direction:row;
    justify-content:center;
    align-items:center;
}`;

function StepCircularProgress(props){
    const {
        stepvalue,
        currentstep,
        totalstep
    } = props;

    return (
        <Wrapper
            container
            wrap="nowrap">
            <RadialProgress 
                variant="static" 
                size={36} 
                thickness={5} 
                value={stepvalue}         
                currentstep={currentstep}
                totalstep={totalstep} />
        </Wrapper>
    );
}

StepCircularProgress.propTypes = {
    value: PropTypes.number,
    currentstep: PropTypes.number,
    totalstep: PropTypes.number
}

export default StepCircularProgress;