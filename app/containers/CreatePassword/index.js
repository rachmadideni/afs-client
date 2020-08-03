import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import messages from './messages';
import {
  makeSelectPassword,
  makeSelectPasswordConfirm,
  makeSelectError,
  makeSelectSuccess
} from './selectors';
import saga from './saga';
import reducer from './reducer';

import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';

import {
  Wrapper,
  PageAppBar,  
  PaperTitle,
  PaperSubtitle,
} from 'components/PageComponents';
import PaperCustom from 'components/PaperCustom';
import BtnCustom from 'components/BtnCustom';
import NotificationSnackbar from 'components/NotificationSnackbar';

import {
  changePasswordAction,
  changePasswordConfirmAction,
  submitPasswordAction,
  clearSuccess
} from './actions';

import { color, typography } from '../../styles/constants';
import isEmpty from 'validator/lib/isEmpty';

class CreatePassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: {
        password: null,
        password_confirm: null,
      },
      isSubmitTriggered: false,
      isSuccessNotification: false
    };
  }

  componentDidUpdate(prevProps){
    if(!!this.props.successMessage && prevProps.successMessage === null){
      this.setState({
        isSuccessNotification:true
      })
    } else if(!!prevProps.successMessage && this.props.successMessage === null){
      this.setState({
        isSuccessNotification:false
      })
    }
  }

  // #region validasi password
  validatePassword = password => {
    const { intl } = this.props;
    let isError = false;
    let errorMsg = null;
    if (isEmpty(password)) {
      isError = true;
      errorMsg = intl.formatMessage(messages.empty_password);
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
  // #endregion

  // #region validasi konfirmasi password
  validatePasswordConfirm = passwordConfirm => {
    const { intl, password } = this.props;
    let isError = false;
    let errorMsg = null;
    if (isEmpty(passwordConfirm)) {
      isError = true;
      errorMsg = intl.formatMessage(messages.empty_password_confirm);
    } else if (password !== passwordConfirm) {
      isError = true;
      errorMsg = intl.formatMessage(messages.password_confirm_not_match);
    } else {
      isError = false;
      errorMsg = null;
    }

    this.setState(state => ({
      ...state,
      error: {
        ...state.error,
        password_confirm: errorMsg,
      },
    }));
    return !isError;
  };
  // #endregion

  // #region submit handler
  handleSubmit = evt => {
    evt.preventDefault();
    const { password, passwordConfirm } = this.props;
    this.setState(state => ({
      ...state,
      isSubmitTriggered: true,
    }));

    if (
      this.validatePassword(password) &&
      this.validatePasswordConfirm(passwordConfirm)
    ) {
      return this.props.submitPassword();
    }
    return false;
  };
  // #endregion

  // #region handle jika user klik tombol arrow back
  handleBack = () => {
    const { history } = this.props;
    return history.replace('/login');
  };
  // #endregion

  // #region handle route changes 
  handleRouteChanges = (route) => {
    const { history } = this.props;
    history.replace(route);
  }
  // #endregion

  render() {
    const {
      intl,
      changePassword,
      changePasswordConfirm,
      password,
      passwordConfirm,
      successMessage
    } = this.props;
    return (
      <Wrapper container wrap="nowrap" direction="column">
        <PageAppBar
          appTitle="Login"
          backHandler={() => this.handleBack()}
        />
        <Box
          display="flex"
          width="100%"
          alignItems="center"
          justifyContent="center"
        >
          <NotificationSnackbar
            verticalPos="top"
            notificationType="success"
            hideDuration={5000}
            open={this.state.isSuccessNotification}
            message={successMessage}
            onClose={() => {
              this.setState({
                isSuccessNotification: false,
              });
              this.props.clearSuccess();
              this.handleRouteChanges('/login');
            }}
          />
          <PaperCustom width={90} elevation={0}>
            <form autoComplete="off">
              <PaperTitle variant="h6" align="left">
                {intl.formatMessage(messages.header)}
              </PaperTitle>
              <PaperSubtitle color="inherit" align="left">
                {intl.formatMessage(messages.subtitle)}
              </PaperSubtitle>

              <TextField
                id="password"
                name="password"
                label="password"
                type="text"
                fullWidth
                variant="outlined"
                margin="dense"
                value={password}
                onChange={evt => {
                  if (this.state.isSubmitTriggered) {
                    this.validatePassword(evt.target.value);
                  }
                  return changePassword(evt.target.value);
                }}
                error={!!this.state.error.password}
                helperText={this.state.error.password}
              />

              <TextField
                id="konfirmasi_password"
                name="konfirmasi_password"
                label="konfirm password"
                type="text"
                fullWidth
                variant="outlined"
                margin="dense"
                value={passwordConfirm}
                onChange={evt => {
                  if (this.state.isSubmitTriggered) {
                    this.validatePasswordConfirm(evt.target.value);
                  }
                  return changePasswordConfirm(evt.target.value);
                }}
                error={!!this.state.error.password_confirm}
                helperText={this.state.error.password_confirm}
              />

              <BtnCustom
                fullWidth
                variant="contained"
                color="primary"
                disabled={!!this.props.errorMessage}
                onClick={this.handleSubmit}
                title={intl.formatMessage(messages.buatPassword)}
              />
            </form>
          </PaperCustom>
        </Box>
      </Wrapper>
    );
  }
}

CreatePassword.propTypes = {
  intl: PropTypes.object,
  password: PropTypes.string,
  passwordConfirm: PropTypes.string,
  errorMessage: PropTypes.string,
  changePassword: PropTypes.func,
  changePasswordConfirm: PropTypes.func,
  submitPassword: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  password: makeSelectPassword(),
  passwordConfirm: makeSelectPasswordConfirm(),
  errorMessage: makeSelectError(),
  successMessage: makeSelectSuccess()
});

function mapDispatchToProps(dispatch) {
  return {
    changePassword: data => dispatch(changePasswordAction(data)),
    changePasswordConfirm: data => dispatch(changePasswordConfirmAction(data)),
    submitPassword: () => dispatch(submitPasswordAction()),
    clearSuccess: () => dispatch(clearSuccess())
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  injectReducer({ key: 'createPassword', reducer }),
  injectSaga({ key: 'createPasswordSaga', saga }),
  injectIntl,
  memo,
)(CreatePassword);
