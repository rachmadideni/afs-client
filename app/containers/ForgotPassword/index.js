/**
 *
 * ForgotPassword
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import makeSelectForgotPassword, {
  makeSelectUserStatus,
  makeSelectErrorMessage,
  makeSelectSuccessMessage,
  makeSelectIsLoading,
  makeSelectKodeReset,
} from './selectors';

import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { color, typography } from 'styles/constants';

import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';

import { makeStyles } from '@material-ui/core/styles';

import {
  Wrapper,
  PageAppBar,
  // AppTitle,
  PaperTitle,
  PaperSubtitle,
} from 'components/PageComponents';
import PaperCustom from 'components/PaperCustom';
import BtnCustom from 'components/BtnCustom';
import NotificationSnackbar from 'components/NotificationSnackbar';

import isEmpty from 'validator/lib/isEmpty';
import isEmail from 'validator/lib/isEmail';
import { cekNikDanEmail, logSuccessMessage, logErrorMessage, simpanPassword } from './actions';

const styles = makeStyles(() => ({
  header: {
    fontFamily: typography.fontFamily,
    fontWeight: 'bold',
    color: color.subtleBlack,
  },
}));

class ForgotPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nik: '',
      email: '',
      kodeReset: '',
      password: '',
      error: {
        nik: null,
        email: null,
        kodeReset: null,
        password: null,
      },
      isSubmitTriggered: false,
      isButtonSimpanTriggered: false,
      openNotification: false,
      openSuccessNotification: false,
    };
  }

  toggleNotification = (state, stateValue) => {
    this.setState({
      [state]: stateValue,
    });
  };

  componentDidUpdate(prevProps) {
    if (!!this.props.errorMessage && prevProps.errorMessage === null) {
      console.log('1');
      this.toggleNotification('openNotification', true);
    } else if (!!prevProps.errorMessage && this.props.errorMessage === null) {
      console.log('2');
      this.toggleNotification('openNotification', false);
    }

    if (!!this.props.successMessage && prevProps.successMessage === null) {
      console.log('3');
      this.toggleNotification('openSuccessNotification', true);
    } else if (
      !!prevProps.successMessage &&
      this.props.successMessage === null
    ) {
      console.log('4');
      this.toggleNotification('openSuccessNotification', false);
    }
  }

  validateNik = nik => {
    const { intl } = this.props;
    let isError = false;
    let errorMsg = null;
    if (isEmpty(nik)) {
      isError = true;
      errorMsg = intl.formatMessage(messages.emptyNik);
    } else {
      isError = false;
      errorMsg = null;
    }

    this.setState(state => ({
      ...state,
      error: {
        ...state.error,
        nik: errorMsg,
      },
    }));
    return !isError;
  };

  validateEmail = email => {
    const { intl } = this.props;
    let isError = false;
    let errorMsg = null;
    if (isEmpty(email)) {
      isError = true;
      errorMsg = intl.formatMessage(messages.emptyEmail);
    } else if (!isEmail(email)) {
      isError = true;
      errorMsg = intl.formatMessage(messages.wrongEmailFormat);
    } else {
      isError = false;
      errorMsg = null;
    }

    this.setState(state => ({
      ...state,
      error: {
        ...state.error,
        email: errorMsg,
      },
    }));
    return !isError;
  };

  validatePassword = password => {
    const { intl } = this.props;
    let isError = false;
    let errorMsg = null;
    if (isEmpty(password)) {
      isError = true;
      errorMsg = intl.formatMessage(messages.emptyPassword);
    } else {
      isError = false;
      errorMsg = null;
    }

    this.setState(state => ({
      ...state,
      error: {
        ...state.error,
        password: errorMsg,
      },
    }));
    return !isError;
  };

  validateKodeReset = () => {
    const { intl, kodeResetDariReduxState } = this.props;
    const { kodeReset } = this.state;
    let isError = false;
    let errorMsg = null;

    console.log(kodeReset !== kodeResetDariReduxState);
    if (isEmpty(kodeReset)) {
      isError = true;
      errorMsg = intl.formatMessage(messages.kodeResetKosong);
      // console.log('inputan kode reset kosong');
    } else if (kodeReset !== kodeResetDariReduxState) {
      isError = true;
      errorMsg = intl.formatMessage(messages.kodeResetTidakSama);
      // console.log('kode reset tidak sama');
    } else if (kodeReset === kodeResetDariReduxState) {
      isError = false;
      errorMsg = null;
      // console.log('kode reset sama');
    }

    this.setState(state => ({
      ...state,
      error: {
        ...state.error,
        kodeReset: errorMsg,
      },
    }));
    return !isError;
  };

  changeInput = (name, value) => {
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = evt => {
    evt.preventDefault();
    this.setState(state => ({
      ...state,
      isSubmitTriggered: true,
    }));

    if (
      this.validateNik(this.state.nik) &&
      this.validateEmail(this.state.email)
    ) {
      console.log('valid on the UI!');
      this.props.cekNikDanEmail(this.state.nik, this.state.email);
    }
    return false;
  };

  // #region handle tombol kembali ke login
  handleBack = () => {
    const { history } = this.props;
    return history.replace('/login');
  };
  // #endregion

  handleRouteChanges = route => {
    const { history } = this.props;
    history.replace(route);
  };

  // #region handle simpan password baru
  handleSimpanPassword = evt => {
    evt.preventDefault();
    this.setState(state => ({
      ...state,
      isButtonSimpanTriggered: true,
    }));

    if (
      this.validateKodeReset() &&
      this.validatePassword(this.state.password)
    ) {
      console.log('kode reset valid');
      this.props.simpanPassword(this.state.nik, this.state.password);
      this.resetLocalState();
    }
    return false;
  };
  // #endregion

  // #region reset state lokal
  resetLocalState = () => {
    this.setState({
      nik: "",
      email: "",
      kodeReset: "",
      password: "",
    });
  }

  render() {
    const { intl } = this.props;
    return (
      <Wrapper container wrap="nowrap" direction="column">
        <PageAppBar appTitle="Login" backHandler={() => this.handleBack()} />
        <Box
          display="flex"
          width="100%"
          alignItems="center"
          justifyContent="center"
        >
          <NotificationSnackbar
            verticalPos="top"
            open={this.state.openNotification}
            onClose={() => {
              // this.toggleNotification('openNotification', false)
              this.props.logErrorMessage(null);
            }}
            hideDuration={5000}
            message={this.props.errorMessage}
            notificationType="warning"
          />

          <NotificationSnackbar
            verticalPos="top"
            open={this.state.openSuccessNotification}
            onClose={() => {
              this.props.logSuccessMsg(null);
              // this.handleRouteChanges('/login');
            }}
            hideDuration={5000}
            message={this.props.successMessage}
            notificationType="success"
          />

          <PaperCustom width={90} elevation={0}>
            <form autoComplete="off">
              <PaperTitle variant="h6" align="left">
                {intl.formatMessage(messages.header)}
              </PaperTitle>
              <PaperSubtitle color="inherit" align="left">
                {intl.formatMessage(messages.headerInstruction)}
              </PaperSubtitle>

              <TextField
                type="text"
                label={intl.formatMessage(messages.nik)}
                value={this.state.nik}
                fullWidth
                variant="outlined"
                margin="dense"
                error={!!this.state.error.nik}
                helperText={this.state.error.nik}
                onChange={evt => {
                  if (this.state.isSubmitTriggered) {
                    this.validateNik(evt.target.value);
                  }
                  return this.changeInput('nik', evt.target.value);
                }}
              />

              <TextField
                type="text"
                label={intl.formatMessage(messages.email)}
                value={this.state.email}
                fullWidth
                variant="outlined"
                margin="dense"
                error={!!this.state.error.email}
                helperText={this.state.error.email}
                onChange={evt => {
                  if (this.state.isSubmitTriggered) {
                    this.validateEmail(evt.target.value);
                  }
                  return this.changeInput('email', evt.target.value);
                }}
              />

              {this.props.kodeResetDariReduxState && (
                <React.Fragment>
                  {/*JSON.stringify(this.state.kodeReset)*/}
                  {/*JSON.stringify(this.state.error.kodeReset)*/}
                  <TextField
                    type="text"
                    label={intl.formatMessage(messages.resetCode)}
                    value={this.state.kodeReset}
                    inputProps={{ maxLength: 6 }}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                    error={!!this.state.error.kodeReset}
                    helperText={this.state.error.kodeReset}
                    onChange={evt => {
                      return this.changeInput('kodeReset', evt.target.value);
                    }}
                  />

                  <TextField
                    type="new_password"
                    label={intl.formatMessage(messages.newPassword)}
                    value={this.state.password}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                    error={!!this.state.error.password}
                    helperText={this.state.error.password}
                    onChange={evt => {
                      if (this.state.isButtonSimpanTriggered) {
                        this.validatePassword(evt.target.value);
                      }
                      return this.changeInput('password', evt.target.value);
                    }}
                  />
                </React.Fragment>
              )}

              <BtnCustom
                fullWidth
                variant="contained"
                color="primary"
                onClick={this.handleSubmit}
                title={intl.formatMessage(messages.resetButton)}
                disabled={this.props.kodeResetDariReduxState}
                startIcon={
                  this.props.isLoading ? (
                    <CircularProgress size={20} style={{ color: 'white' }} />
                  ) : null
                }
              />

              {this.props.kodeResetDariReduxState && (
                <BtnCustom
                  fullWidth
                  variant="outlined"
                  color="primary"
                  onClick={this.handleSimpanPassword}
                  title={intl.formatMessage(messages.simpanPasswordButton)}
                />
              )}
            </form>
          </PaperCustom>
        </Box>
      </Wrapper>
    );
  }
}

ForgotPassword.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  forgotPassword: makeSelectForgotPassword(),
  userStatus: makeSelectUserStatus(),
  errorMessage: makeSelectErrorMessage(),
  successMessage: makeSelectSuccessMessage(),
  isLoading: makeSelectIsLoading(),
  kodeResetDariReduxState: makeSelectKodeReset(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    cekNikDanEmail: (nik, email) => dispatch(cekNikDanEmail(nik, email)),
    logSuccessMsg: message => dispatch(logSuccessMessage(message)),
    logErrorMessage: message => dispatch(logErrorMessage(message)),
    simpanPassword: (nik, password) => dispatch(simpanPassword(nik, password)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  injectReducer({ key: 'forgotPassword', reducer }),
  injectSaga({ key: 'forgotPassword', saga }),
  injectIntl,
  // memo,
)(ForgotPassword);
