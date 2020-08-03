/**
 *
 * ChangePasswordPage
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
// import FormControl from '@material-ui/core/FormControl';
// import Backdrop from '@material-ui/core/Backdrop';
// import CircularProgress from '@material-ui/core/CircularProgress';
// import Button from '@material-ui/core/Button';
import isEmpty from 'validator/lib/isEmpty';
import BtnCustom from 'components/BtnCustom';
import BackdropMessage from '../../components/BackdropMessage';
import { color, typography } from '../../styles/constants';

import messages from './messages';
import saga from './saga';
import reducer from './reducer';
import {
  changeNewPasswordAction,
  changeOldPasswordAction,
  changeNewPasswordConfirmAction,
  submitChangePasswordAction,
} from './actions';
import {
  makeSelectIsLoading,
  makeSelectOldPassword,
  makeSelectNewPassword,
  makeSelectConfirmNewPassword,
  makeSelectIsNewPasswordConfirmed,
  makeSelectIsChangedPasswordSuccess,
} from './selectors';
const Wrapper = styled(props => <Grid {...props}>{props.children}</Grid>)`
  && {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    background-color: ${color.white};
  }
`;

class ChangePasswordPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: {
        oldPassword: null,
        newPassword: null,
        confirmNewPassword: null,
      },
      isSubmitTriggered: false,
    };
  }

  validateOldPassword = oldPassword => {
    const { intl } = this.props;
    let isError = false;
    let errorMsg = null;
    if (isEmpty(oldPassword)) {
      isError = true;
      errorMsg = intl.formatMessage(messages.emptyOldPassword);
    } else {
      isError = false;
      errorMsg = null;
    }

    this.setState(state => ({
      ...state,
      error: {
        ...state.error,
        oldPassword: errorMsg,
      },
    }));
    return !isError;
  };

  validateNewPassword = newPassword => {
    const { intl } = this.props;
    let isError = false;
    let errorMsg = null;
    if (isEmpty(newPassword)) {
      isError = true;
      errorMsg = intl.formatMessage(messages.emptyNewPassword);
    } else {
      isError = false;
      errorMsg = null;
    }

    this.setState(state => ({
      ...state,
      error: {
        ...state.error,
        newPassword: errorMsg,
      },
    }));
    return !isError;
  };

  validateNewPasswordConfirm = newPasswordConfirm => {
    const { intl, newPassword } = this.props;
    let isError = false;
    let errorMsg = null;
    if (isEmpty(newPasswordConfirm)) {
      isError = true;
      errorMsg = intl.formatMessage(messages.emptyNewPasswordConfirm);
    } else if (newPasswordConfirm !== newPassword) {
      isError = true;
      errorMsg = intl.formatMessage(messages.newPasswordConfirmIsNotSame);
    } else {
      isError = false;
      errorMsg = null;
    }

    this.setState(state => ({
      ...state,
      error: {
        ...state.error,
        confirmNewPassword: errorMsg,
      },
    }));
    return !isError;
  };

  handleSubmit = evt => {
    evt.preventDefault();
    const { oldPassword, newPassword, confirmNewPassword } = this.props;

    this.setState(state => ({
      ...state,
      isSubmitTriggered: true,
    }));

    if (
      this.validateOldPassword(oldPassword) &&
      this.validateNewPassword(newPassword) &&
      this.validateNewPasswordConfirm(confirmNewPassword)
    ) {
      return this.props.submitChangePassword();
    }
    return false;
  };

  render() {
    const {
      intl,
      history,
      oldPassword,
      newPassword,
      confirmNewPassword,
      // isLoading,
      // isNewPasswordConfirmed,
      changeNewPassword,
      changeOldPassword,
      changeNewPasswordConfirm,
      isChangedPasswordSuccess,
    } = this.props;
    return (
      <Wrapper container wrap="nowrap" direction="column">
        <Grid item>
          <BackdropMessage
            open={false}
            type={isChangedPasswordSuccess}
            messages={messages}
            onClick={() => history.replace('/profil')}
          />
        </Grid>
        <Grid item>
          <Grid container wrap="nowrap" direction="column">
            <Grid
              item
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <form autoComplete="off">
                <Grid container wrap="nowrap" direction="column">
                  <Grid
                    item
                    style={{
                      marginTop: 40,
                    }}
                  >
                    <Typography
                      variant="h6"
                      color="primary"
                      align="center"
                      gutterBottom
                      style={{
                        fontFamily: typography.fontFamily,
                        fontWeight: 'bold',
                        textTransform: 'capitalize',
                      }}
                    >
                      {intl.formatMessage(messages.changePassword)}
                    </Typography>

                    <TextField
                      id="oldPassword"
                      name="oldPassword"
                      label={intl.formatMessage(messages.oldPassword)}
                      value={oldPassword}
                      type="text"
                      variant="outlined"
                      margin="dense"
                      fullWidth
                      onChange={evt => {
                        if (this.state.isSubmitTriggered) {
                          this.validateOldPassword(evt.target.value);
                        }
                        return changeOldPassword(evt.target.value);
                      }}
                      error={!!this.state.error.oldPassword}
                      helperText={this.state.error.oldPassword}
                      style={{
                        fontFamily: typography.fontFamily,
                      }}
                    />

                    <TextField
                      id="newPassword"
                      name="newPassword"
                      label={intl.formatMessage(messages.newPassword)}
                      value={newPassword}
                      type="text"
                      variant="outlined"
                      margin="dense"
                      fullWidth
                      onChange={evt => {
                        if (this.state.isSubmitTriggered) {
                          this.validateNewPassword(evt.target.value);
                        }
                        return changeNewPassword(evt.target.value);
                      }}
                      error={!!this.state.error.newPassword}
                      helperText={this.state.error.newPassword}
                      style={{
                        fontFamily: typography.fontFamily,
                      }}
                    />

                    <TextField
                      id="confirmNewPassword"
                      name="confirmNewPassword"
                      label={intl.formatMessage(messages.newPasswordConfirm)}
                      value={confirmNewPassword}
                      type="text"
                      variant="outlined"
                      margin="dense"
                      fullWidth
                      onChange={evt => {
                        if (this.state.isSubmitTriggered) {
                          this.validateNewPasswordConfirm(evt.target.value);
                        }
                        return changeNewPasswordConfirm(evt.target.value);
                      }}
                      error={!!this.state.error.confirmNewPassword}
                      helperText={this.state.error.confirmNewPassword}
                      style={{
                        fontFamily: typography.fontFamily,
                      }}
                    />

                    <BtnCustom
                      fullWidth
                      variant="contained"
                      color="primary"
                      disabled={
                        !!this.state.oldPassword ||
                        !!this.state.newPassword ||
                        !!this.state.confirmNewPassword
                      }
                      onClick={this.handleSubmit}
                      disableElevation
                      title={intl.formatMessage(messages.btnChangePassword)}
                    />
                  </Grid>
                </Grid>
              </form>
            </Grid>
          </Grid>
        </Grid>
      </Wrapper>
    );
  }
}

ChangePasswordPage.propTypes = {
  intl: PropTypes.object,
  history: PropTypes.object,
  // isLoading: PropTypes.bool,
  // isNewPasswordConfirmed: PropTypes.bool,
  oldPassword: PropTypes.string,
  newPassword: PropTypes.string,
  confirmNewPassword: PropTypes.string,
  changeNewPassword: PropTypes.func.isRequired,
  changeOldPassword: PropTypes.func.isRequired,
  changeNewPasswordConfirm: PropTypes.func.isRequired,
  submitChangePassword: PropTypes.func.isRequired,
  isChangedPasswordSuccess: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  isLoading: makeSelectIsLoading(),
  oldPassword: makeSelectOldPassword(),
  newPassword: makeSelectNewPassword(),
  confirmNewPassword: makeSelectConfirmNewPassword(),
  isNewPasswordConfirmed: makeSelectIsNewPasswordConfirmed(),
  isChangedPasswordSuccess: makeSelectIsChangedPasswordSuccess(),
});

function mapDispatchToProps(dispatch) {
  return {
    // dispatch,
    changeNewPassword: value => dispatch(changeNewPasswordAction(value)),
    changeOldPassword: value => dispatch(changeOldPasswordAction(value)),
    changeNewPasswordConfirm: value =>
      dispatch(changeNewPasswordConfirmAction(value)),
    submitChangePassword: () => dispatch(submitChangePasswordAction()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'changePasswordPage', reducer });
const withSaga = injectSaga({ key: 'changePasswordPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
  injectIntl,
  memo,
)(ChangePasswordPage);
