/**
 *
 * SignIn
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectSignIn from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

const Container = styled.div`
  display:flex;
  flex-direction:column;
  width:100%;
  height:100%;
  align-items: center;
  justify-content: center;
  background-color:green;
`

const Form = styled.div`
  display:flex;  
  // width:300px;  
  // height:500px;
`

export function SignIn() {
  useInjectReducer({ key: 'signIn', reducer });
  useInjectSaga({ key: 'signIn', saga });

  return (
    <Container>
      <Form>
        <div>satu</div>
      </Form>     
    </Container>
  );
}

SignIn.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  signIn: makeSelectSignIn(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(SignIn);
