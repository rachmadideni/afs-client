/**
 *
 * Login
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

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import CircularProgress from '@material-ui/core/CircularProgress';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Backdrop from '@material-ui/core/Backdrop';

import NotificationSnackbar from 'components/NotificationSnackbar';
import BtnCustom from 'components/BtnCustom';
import PaperCustom from 'components/PaperCustom';

import isEmpty from 'validator/lib/isEmpty';
import { color, typography } from 'styles/constants';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import {
  resetInputAction,
  changeNikAction,
  changePasswordAction,
  loginAction,
  loginErrorAction,
  loginSuccessAction,
} from './actions';
import messages from './messages';
import reducer from './reducer';
import saga from './saga';
import { makeSelectAuthToken } from '../App/selectors';
import {
  makeSelectLogin,
  makeSelectCredential,
  makeSelectError,
  makeSelectLoginSuccessMessage,
  makeSelectIsLoading,
} from './selectors';

// import { Wrapper, AppTitle } from '../Verifikasi/components';
import {
  Wrapper,
  AppTitle,
} from 'components/PageComponents';

const styles = makeStyles(() => ({
  textField: {
    fontFamily: typography.fontFamily,
    fontSize: 12,
    backgroundColor: color.grey,
    borderRadius: 4,
    textTransform: 'capitalize',
  },
}));

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      backdropOpen: false,
      error: {
        nik: null,
        email: null,
        password: null,
      },
      isSubmitTriggered: false,
      isProcessing: false,
      showPassword: false,
      isNotificationOpen: false,
      isUserLoginSuccessNotificationOpen: false,
    };
  }

  componentDidMount() {
    this.props.resetInput();
  }

  handleNotificationState = (name, value) => {
    this.setState(state => ({
      ...state,
      [name]: value,
    }));
  };

  componentDidUpdate(prevProps) {
    if (!!this.props.errorMessage && prevProps.errorMessage === null) {
      this.handleNotificationState('isNotificationOpen', true);
    } else if (!!prevProps.errorMessage && this.props.errorMessage === null) {
      this.handleNotificationState('isNotificationOpen', false);
    }

    if (!!this.props.successMessage && prevProps.successMessage === null) {
      this.handleNotificationState('isUserLoginSuccessNotificationOpen', true);
    } else if (
      !!prevProps.successMessage &&
      this.props.successMessage === null
    ) {
      this.handleNotificationState('isUserLoginSuccessNotificationOpen', false);
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

  handleVerification = () => {
    const { history } = this.props;
    return history.replace('/verifikasi');
  };

  // #region handle route changes 
  handleRouteChanges = (route) => {
    const { history } = this.props;
    history.replace(route);
  }
  // #endregion

  handleSubmit = evt => {
    evt.preventDefault();
    const { credential } = this.props;
    this.setState(state => ({
      ...state,
      isSubmitTriggered: true,
    }));

    if (
      this.validateNik(credential.nik) &&
      this.validatePassword(credential.password)
    ) {
      return this.props.login();
    }
    return false;
  };

  handleClickShowPassword = () => {
    this.setState(state => ({
      showPassword: !state.showPassword,
    }));
  };

  render() {
    const { intl, credential, changeNik, changePassword } = this.props;

    return (
      <Wrapper container wrap="nowrap" direction="column">
        <AppBar
          style={{
            backgroundColor: 'transparent',
            boxShadow: 'none',
          }}
        >
          <Toolbar style={{ justifyContent: 'center' }}>
            <AppTitle gutterBottom>
              {intl.formatMessage(messages.appTitle)}
            </AppTitle>
          </Toolbar>
        </AppBar>
        <Box
          display="flex"
          width="100%"
          height="100vh"
          alignItems="center"
          justifyContent="center"
        >
          <Backdrop
            open={this.props.isLoading}
            style={{
              zIndex: 3000,
              color: color.white,
            }}
          >
            <CircularProgress color="inherit" />
          </Backdrop>

          <NotificationSnackbar
            verticalPos="top"
            open={this.state.isUserLoginSuccessNotificationOpen}
            onClose={() => this.props.logSuccessMessage(null)}
            hideDuration={3000}
            message={this.props.successMessage}
            notificationType="success"
          />

          <PaperCustom
            elevation={0}
            style={{ marginLeft: 20, marginRight: 20 }}
          >
            <form autoComplete="off">
              <Typography
                variant="h6"
                color="primary"
                align="left"
                style={{
                  fontFamily: typography.fontFamily,
                  fontWeight: 'bold',
                  color: color.subtleBlack,
                }}
              >
                {intl.formatMessage(messages.header)}
              </Typography>
              <Typography
                color="inherit"
                align="left"
                style={{
                  fontFamily: typography.fontFamily,
                  fontSize: 10,
                  fontWeight: 'normal',
                  color: color.subtleBlack,
                }}
              >
                {intl.formatMessage(messages.HeaderWelcomeMessage)}
              </Typography>

              <TextField
                id="nik"
                name="nik"
                value={credential.nik}
                label={intl.formatMessage(messages.nik)}
                type="text"
                fullWidth
                variant="outlined"
                margin="dense"
                onChange={evt => {
                  if (this.state.isSubmitTriggered) {
                    this.validateNik(evt.target.value);
                  }
                  return changeNik(evt.target.value);
                }}
                error={!!this.state.error.nik}
                helperText={this.state.error.nik}
                className={styles.textField}
              />

              <TextField
                id="password"
                name="password"
                value={credential.password}
                label={intl.formatMessage(messages.password)}
                onChange={evt => {
                  if (this.state.isSubmitTriggered) {
                    this.validatePassword(evt.target.value);
                  }
                  return changePassword(evt.target.value);
                }}
                type={this.state.showPassword ? 'text' : 'password'}
                fullWidth
                variant="outlined"
                margin="dense"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        color="inherit"
                        onClick={this.handleClickShowPassword}
                      >
                        {this.state.showPassword ? (
                          <Visibility style={{ color: color.black }} />
                        ) : (
                          <VisibilityOff style={{ color: color.grey }} />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                error={!!this.state.error.password}
                helperText={this.state.error.password}
              />

              <BtnCustom
                fullWidth
                variant="contained"
                color="primary"
                disabled={!!this.props.errorMessage}
                onClick={this.handleSubmit}
                title={intl.formatMessage(messages.loginButton)}
              />

              <BtnCustom
                fullWidth
                variant="outlined"
                color="primary"
                onClick={()=> this.handleRouteChanges('/registrasi')}
                title={intl.formatMessage(messages.registerButton)}
              />
              
              <BtnCustom
                fullWidth
                variant="outlined"
                color="primary"
                onClick={()=> this.handleRouteChanges('/resetPassword')}
                title={intl.formatMessage(messages.resetPasswordButton)}
              />

              <NotificationSnackbar
                verticalPos="bottom"
                open={this.state.isNotificationOpen}
                onClose={() => this.props.logError(null)}
                hideDuration={3000}
                message={this.props.errorMessage}
                notificationType="error"
              />
            </form>
          </PaperCustom>
        </Box>
      </Wrapper>
    );
  }
}

Login.propTypes = {
  resetInput: PropTypes.func,
  errorMessage: PropTypes.string,
  intl: PropTypes.object,
  history: PropTypes.object,
  credential: PropTypes.object,
  login: PropTypes.func,
  changeNik: PropTypes.func,
  changePassword: PropTypes.func,
  isLoading: PropTypes.bool,
  successMessage: PropTypes.string,
  logError: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  login: makeSelectLogin(),
  credential: makeSelectCredential(),
  isLoading: makeSelectIsLoading(),
  token: makeSelectAuthToken(),
  errorMessage: makeSelectError(),
  successMessage: makeSelectLoginSuccessMessage(),
});

function mapDispatchToProps(dispatch) {
  return {
    changeNik: nik => dispatch(changeNikAction(nik)),
    changePassword: password => dispatch(changePasswordAction(password)),
    login: () => dispatch(loginAction()),
    resetInput: () => dispatch(resetInputAction()),
    logError: error => dispatch(loginErrorAction(error)),
    logSuccessMessage: message => dispatch(loginSuccessAction(message)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  memo,
  injectReducer({ key: 'login', reducer }),
  injectSaga({ key: 'saga', saga }),
  withConnect,
  injectIntl,  
)(Login);
