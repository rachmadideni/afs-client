import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';

const WrapperElem = styled(props => {
  const { children, ...otherProps } = props;

  return (
    <Grid container wrap="nowrap" {...otherProps}>
      {children}
    </Grid>
  );
})`
  && {
    flex: 3;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
  }
`;

const StepTitle = styled(props => {
  const { title, ...otherProps } = props;

  return <Typography {...otherProps}>{title}</Typography>;
})`
  && {
    font-size: 14px;
    font-weight: bold;
    color: black;
    text-transform: capitalize;
  }
`;

const StepSubtitle = styled(props => {
  const { subtitle, ...otherProps } = props;

  return <Typography {...otherProps}>{subtitle}</Typography>;
})`
  && {
    font-size: 9px;
    font-weight: bold;
    color: grey;
    text-transform: capitalize;
  }
`;

function StepContentComp(props) {
  const { title, subtitle } = props;

  return (
    <WrapperElem>
      <StepTitle title={title} />
      <StepSubtitle subtitle={subtitle} />
    </WrapperElem>
  );
}

StepContentComp.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
};

export default StepContentComp;
