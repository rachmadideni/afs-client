/**
 *
 * UserRegistration
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
import { makeSelectUser, makeSelectError, makeSelectSuccess } from './selectors';
import { changeInputAction, registrasi, clearError, clearSuccess, mintaKodeAktifasi } from './actions';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { ArrowForward } from '@material-ui/icons';

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

class UserRegistration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: {
        nik: null,
        email: null,
        nomorTelpon: null,
      },
      isSubmitTriggered: false,
      isErrorNotification: false,
      isSuccessNotification: false
    };
  }
  componentDidMount(){
    // console.log(this.props.error.message);
  }

  // #region error checking
  componentDidUpdate(prevProps){
    
    if(!!this.props.error.message && prevProps.error.message === null){
      console.log('error happens');
      this.setState({
        isErrorNotification:true
      })      
    } else if(!!prevProps.error.message && this.props.error.message === null){
      console.log('clearing error log')
      this.setState({
        isErrorNotification:false
      })
    }

    if(!!this.props.success.message && prevProps.success.message === null){
      this.setState({
        isSuccessNotification:true
      })
    } else if(!!prevProps.success.message && this.props.success.message === null){
      this.setState({
        isSuccessNotification:false
      })
    }
    console.log('component updated!')
  }
  // #endregion

  // #region validasi NIK
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
  // #endregion

  // #region validasi Email
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
  // #endregion

  // #region validasi nomor handphone / nomor telpon
  validateTelpon = telpon => {
    const { intl } = this.props;
    let isError = false;
    let errorMsg = null;
    if (isEmpty(telpon)) {
      isError = true;
      errorMsg = intl.formatMessage(messages.emptyNomorTelpon);
    } else {
      isError = false;
      errorMsg = null;
    }

    this.setState(state => ({
      ...state,
      error: {
        ...state.error,
        nomorTelpon: errorMsg,
      },
    }));
    return !isError;
  };
  // #endregion

  // #region Submit Handler
  handleSubmit = evt => {
    evt.preventDefault();
    const { user, history } = this.props;

    this.setState(state => ({
      ...state,
      isSubmitTriggered: true,
    }));

    // cek jika user input valid
    if (
      this.validateNik(user.nik) &&
      this.validateEmail(user.email) &&
      this.validateTelpon(user.nomtel)
    ) {
      // run
      // return this.props.verifikasi();
      return this.props.registrasi();
    }
    return false;
  };
  // #endregion

  handleRouteChanges = (route) => {
    const { history } = this.props;
    history.replace(route);
  }

  // #region handle jika user klik tombol arrow back
  handleBack = () => {
    const { history } = this.props;
    return history.replace('/login');
  };
  // #endregion
  

  render() {
    const { intl, changeInput, user, error, success } = this.props;
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
            open={this.state.isErrorNotification}
            onClose={() => {
              this.setState({
                isErrorNotification: false,
              });
              this.props.clearError();
            }}
            hideDuration={5000}
            message={
              <React.Fragment>
                {`${error.message} `}
                {
                  error.user && error.user.NEMAIL !== user.email ? (<React.Fragment></React.Fragment>)
                  : error.user && error.user.STATUS === 0 ? 
                  (<Typography display="inline">
                    <Link onClick={() => this.props.mintaKodeAktifasi()}>
                      {intl.formatMessage(messages.btnResendKodeVerifikasi)}
                    </Link>
                  </Typography>) 
                : error.user && error.user.STATUS === 1 ? 
                (<Typography display="inline">
                    <Link onClick={() => this.handleRouteChanges('/resetPassword')}>
                      {intl.formatMessage(messages.LinkForgotPassword)}
                    </Link>
                  </Typography>)
                : <></>
              }
              </React.Fragment>
            }
            notificationType="warning"
          />

          <NotificationSnackbar 
            verticalPos="top" 
            notificationType="success"
            hideDuration={5000}
            message={success.message}
            open={this.state.isSuccessNotification}
            onClose={() => {
              this.setState({
                isSuccessNotification: false,
              });
              this.props.clearError();
              this.props.clearSuccess();
              this.handleRouteChanges('/verifikasi/confirm');
            }} />

          <PaperCustom width={90} elevation={0}>
            <PaperTitle variant="h6" align="left">
              {intl.formatMessage(messages.header)}
            </PaperTitle>
            <PaperSubtitle color="inherit" align="left">
              {intl.formatMessage(messages.subtitle)}
            </PaperSubtitle>

            <TextField
              id="nik"
              name="nik"
              type="text"
              label={intl.formatMessage(messages.nik)}
              placeholder={intl.formatMessage(messages.placeholderNIK)}
              value={user.nik}
              fullWidth
              variant="outlined"
              margin="dense"
              onChange={evt => {
                if (this.state.isSubmitTriggered) {
                  this.validateNik(evt.target.value);
                }
                return changeInput('nik', evt.target.value);
              }}
              error={!!this.state.error.nik}
              helperText={this.state.error.nik}
            />

            <TextField
              id="email"
              name="email"
              label={intl.formatMessage(messages.email)}
              placeholder={intl.formatMessage(messages.placeholderEmail)}
              value={user.email}
              type="email"
              fullWidth
              variant="outlined"
              margin="dense"
              onChange={evt => {
                if (this.state.isSubmitTriggered) {
                  this.validateEmail(evt.target.value);
                }
                return changeInput('email', evt.target.value);
              }}
              error={!!this.state.error.email}
              helperText={this.state.error.email}
            />

            <TextField
              id="nomtel"
              name="nomtel"
              label={intl.formatMessage(messages.nomorTelpon)}
              placeholder={intl.formatMessage(
                messages.placeholderNoHandphone,
              )}
              value={user.nomtel}
              type="number"
              fullWidth
              variant="outlined"
              margin="dense"
              onChange={evt => {
                if (this.state.isSubmitTriggered) {
                  this.validateTelpon(evt.target.value);
                }
                return changeInput('nomtel', evt.target.value);
              }}
              error={!!this.state.error.nomorTelpon}
              helperText={this.state.error.nomorTelpon}
            />

            <BtnCustom
              fullWidth
              variant="contained"
              color="primary"
              disabled={
                !!this.state.error.email ||
                !!this.state.error.nik ||
                !!this.state.error.nomorTelpon
              }
              onClick={this.handleSubmit}
              disableElevation
              endIcon={<ArrowForward />}
              title={intl.formatMessage(messages.btnVerifikasi)}
            />
          </PaperCustom>
        </Box>
      </Wrapper>
    );
  }
}

UserRegistration.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({  
  user: makeSelectUser(),
  error: makeSelectError(),
  success: makeSelectSuccess()
});

function mapDispatchToProps(dispatch) {
  return {    
    changeInput: (key, value) => dispatch(changeInputAction(key, value)),
    registrasi: () => dispatch(registrasi()),
    clearError: () => dispatch(clearError()),
    clearSuccess: () => dispatch(clearSuccess()),
    mintaKodeAktifasi: () => dispatch(mintaKodeAktifasi())
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'userRegistration', reducer });
const withSaga = injectSaga({ key: 'userRegistration', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
  injectIntl,
  // memo,
)(UserRegistration);
