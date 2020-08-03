import React from 'react';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import ChevronRight from '@material-ui/icons/ChevronRight';
import {color} from '../../styles/constants';

function StepNextButton(props){
    const { 
        isDisabled, 
        onClickNext 
    } = props;
    
    return (
        <Grid>
            <IconButton                 
                edge="start"
                size="small" 
                color="primary" 
                disabled={isDisabled}
                onClick={onClickNext}
                style={{
                    marginTop:5,
                    fontSize:12,
                    border:isDisabled ? `solid 2px ${color.grey}` : `solid 2px ${color.white}`,
                    backgroundColor: isDisabled ? color.white : color.green 
                }}>
                <ChevronRight style={{
                    color:isDisabled ? color.grey : color.white
                }}/>
            </IconButton>
        </Grid>
    )
}

export default StepNextButton;