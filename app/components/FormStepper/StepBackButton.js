import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import { color } from '../../styles/constants';

function StepBackButton(props) {
  const { active, onClickBack, ...otherProps } = props;

  return (
    <Grid {...otherProps}>
      <IconButton
        edge="start"
        size="small"
        color={active ? 'primary' : 'default'}
        disable={active.toString()}
        disableRipple={!active}
        onClick={onClickBack}
        style={{
          width: '36px',
          height: '36px',
          marginTop: 5,
          fontSize: 12,
          border: !active
            ? `solid 2px ${color.grey}`
            : `solid 2px ${color.white}`,
          backgroundColor: !active ? color.white : color.green,
        }}
      >
        <ChevronLeft
          style={{
            color: !active ? color.grey : color.white,
          }}
        />
      </IconButton>
    </Grid>
  );
}

StepBackButton.propTypes = {
  active: PropTypes.bool,
  onClickBack: PropTypes.func,
};

export default StepBackButton;
