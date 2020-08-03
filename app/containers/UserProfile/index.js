/**
 *
 * UserProfile
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import injectSaga from 'utils/injectSaga';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import BtnCustom from 'components/BtnCustom';

import { typography } from 'styles/constants';
import makeSelectUserProfile from './selectors';
import messages from './messages';
import { removeAuthTokenAction } from '../App/actions';

import { makeSelectEmail, makeSelectNotelp } from '../App/selectors';
import saga from '../Login/saga';

const StyledAvatar = styled(Avatar)`
  && {
    margin-top: 20px;
    margin-bottom: 10px;
    width: 80px;
    height: 80px;
  }
`;

const StyledText = styled(props => <Typography {...props} />)`
  && {
    font-family: ${typography.fontFamily};
    font-size: ${props => props.size}px;
    font-weight: bold;
  }
`;

class UserProfile extends React.Component {
  goToChangePasswordPage = () => this.props.history.replace('/changePassword');

  render() {
    const { intl, removeAuthToken, email, notelp } = this.props;
    return (
      <Box
        display="flex"
        width="100%"
        height="100%"
        alignItems="center"
        justifyContent="center"
      >
        <Grid
          container
          wrap="nowrap"
          direction="column"
          justify="center"
          alignItems="center"
          style={{ backgroundColor: 'transparent' }}
        >
          <Grid item>
            <StyledAvatar />
          </Grid>
          <Grid item style={{ marginBottom: 20, textAlign: 'center' }}>            
            <StyledText size={12}>{email}</StyledText>
            <StyledText size={12}>{notelp}</StyledText>
          </Grid>

          <BtnCustom
            variant="outlined"
            color="primary"
            fullWidth
            onClick={() => removeAuthToken()}
            title={intl.formatMessage(messages.logout)}
            style={{ borderRadius: '36px' }}
          />

          <BtnCustom
            variant="outlined"
            color="primary"
            fullWidth
            onClick={this.goToChangePasswordPage}
            title={intl.formatMessage(messages.ubahPassword)}
            style={{ borderRadius: '36px' }}
          />
        </Grid>
      </Box>
    );
  }
}

UserProfile.propTypes = {
  intl: PropTypes.object,
  history: PropTypes.object,
  removeAuthToken: PropTypes.func,
  email: PropTypes.string,
  notelp: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  userProfile: makeSelectUserProfile(),
  email: makeSelectEmail(),
  notelp: makeSelectNotelp(),
});

function mapDispatchToProps(dispatch) {
  return {
    removeAuthToken: () => dispatch(removeAuthTokenAction()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withSaga = injectSaga({ key: 'loginSaga', saga });
export default compose(
  withConnect,
  withSaga,
  injectIntl,
  memo,
)(UserProfile);
