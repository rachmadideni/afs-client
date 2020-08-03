/**
 *
 * VerifyConfirmPage
 *
 */

import React, { memo } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

// import {
//   getTokenVerifikasiFromStorage
// } from '../Login/helpers';

import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';

// custom components
import ReactCodeInput from 'react-code-input';
import NotificationSnackbar from 'components/NotificationSnackbar';
import PaperCustom from 'components/PaperCustom';

import {
  Wrapper,
  PageAppBar,
  AppTitle,
  PaperTitle,
  PaperSubtitle,
} from 'components/PageComponents';

import isEmpty from 'validator/lib/isEmpty';
import jwtDecode from 'jwt-decode';
import store from 'store';
import { color, typography } from '../../styles/constants';
import saga from './saga';
import messages from './messages';
import {
  changeKodeAktifasiAction,
  konfirmasiKodeAction,
  logErrorAction,
  logSuccessAction,
} from './actions';

import reducer from './reducer';
import {
  makeSelectTokenVerifikasi,
  makeSelectKodeVerifikasi,
} from '../Verifikasi/selectors';

import {
  // makeSelectKodeAktifasi,
  makeSelectKodeFromServer,
  makeSelectError,
  makeSelectSuccess,
} from './selectors';

import { makeSelectKodeAktifasi } from "../UserRegistration/selectors";

const StyledCodeInput = styled(ReactCodeInput)`
  && {
    display: block;
    text-align: center;
    input {
      margin: 2px;
      width: 40px;
      height: 40px;
      border-radius: 4px;
      text-align: center;
      background-color: transparent;
      color: ${color.subtleBlack};
      border: 2px solid ${color.grey};
      transition: all 150ms ease-in-out;
      outline: none;
    }
    input:focus {
      width: 40px;
      height: 40px;
      color: ${color.green};
      border-color: ${color.green};
    }
  }
`;

class VerifyConfirmPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: {
        errorMessage: null,
      },
      isSubmitTriggered: false,
      isNotificationOpen: false,
      confirm: {
        successMessage: null,
      },
      successNotified: false,
    };
  }

  componentDidUpdate(prevProps) {
    if (!!this.props.errorMessage && prevProps.errorMessage === null) {
      this.handleErrorNotification(true);
    } else if (!!prevProps.errorMessage && this.props.errorMessage === null) {
      this.handleErrorNotification(false);
    } else if (
      !!prevProps.successMessage &&
      this.props.successMessage === null
    ) {
      this.handleSuccessNotification(false);
    } else if (
      !!this.props.successMessage &&
      prevProps.successMessage === null
    ) {
      this.handleSuccessNotification(true);
    }
  }

  handleErrorNotification = notificationState => {
    this.setState(state => ({
      ...state,
      isNotificationOpen: notificationState,
    }));
  };

  handleSuccessNotification = notificationState => {
    this.setState(state => ({
      ...state,
      successNotified: notificationState,
    }));
  };

  // #region cek status token
  isTokenExpired = () => {
    let isExpired = false;
    const tokenVerifikasi = store.get('token_verifikasi');

    try {
      const { exp } = jwtDecode(tokenVerifikasi);
      if (Date.now() >= exp * 1000) {
        isExpired = false;
      } else {
        isExpired = true;
      }
    } catch (err) {
      isExpired = true;
    }

    return !isExpired;
  };
  // #endregion

  // #region validasi kode aktifasi
  validateKodeAktifasi = kode => {
    const { intl, kodeVerifikasi, kodeAktifasi } = this.props;
    let isError = false;
    let errorMsg = null;
    let successMessage = null;
    // console.log(typeof kode, typeof kodeAktifasi);
    if (isEmpty(kode)) {
      isError = true;
      errorMsg = intl.formatMessage(messages.emptyCode);
      successMessage = null;
      console.log('kosong')
    }
    
    if (kode !== kodeAktifasi) {      
      isError = true;
      errorMsg = intl.formatMessage(messages.codeNotMatch);
      successMessage = null;
      console.log('kode tidak sama')
    }
    
    if (kode === kodeAktifasi) {
      isError = false;
      errorMsg = null;
      successMessage = intl.formatMessage(messages.codeIsMatch);
      console.log('kode cocok')
    }

    // if (this.isTokenExpired()) {
    //   isError = true;
    //   errorMsg = intl.formatMessage(messages.tokenExpired);
    //   console.log('kode expired')
    // }

    this.setState(state => ({
      ...state,
      error: {
        ...state.error,
        message: errorMsg,
      },
      confirm: {
        ...state.confirm,
        message: successMessage,
      },
    }));
    return !isError;
  };
  //#endregion

  // #region handle tombol kembali ke login
  handleBack = () => {
    const { history } = this.props;
    return history.replace('/login');
  };
  // #endregion

  // #region auto submit jika input kode aktifasi cocok dgn yg di email
  autoSubmit = () => {
    const { intl } = this.props;
    this.props.logSuccess(intl.formatMessage(messages.codeIsMatch));
    this.setState(state => ({
      ...state,
      successNotified: true,
      confirm: {
        ...state.confirm,
        successMessage: intl.formatMessage(messages.codeIsMatch),
      },
    }));
  };
  //#endregion

  render() {
    const { intl } = this.props;
    return (
      <Wrapper container wrap="nowrap" direction="column">
        <PageAppBar appTitle="Login" backHandler={() => this.handleBack()} />
        <Box
          display="flex"
          width="100%"
          height="100%"
          alignItems="center"
          justifyContent="center">
          <PaperCustom width={90} elevation={0}>
            <form autoComplete="off">
              <PaperTitle variant="h6" align="left">
                {intl.formatMessage(messages.header)}
              </PaperTitle>
              <PaperSubtitle color="inherit" align="left">
                {intl.formatMessage(messages.subtitle)}
              </PaperSubtitle>

              <FormControl margin="dense" fullWidth error>
                <StyledCodeInput
                  type="string"
                  fields={6}
                  onChange={val => {
                    if (val.length === 6) {
                      if (this.validateKodeAktifasi(val)) {
                        return this.autoSubmit(val);
                      }
                      return this.props.logError(
                        intl.formatMessage(messages.codeNotMatch),
                      );
                    }
                    return false;
                  }}
                />
              </FormControl>

              <NotificationSnackbar
                verticalPos="top"
                open={this.state.isNotificationOpen}
                onClose={() => this.props.logError(null)}
                hideDuration={3000}
                message={this.props.errorMessage}
                notificationType="error"
              />

              <NotificationSnackbar
                verticalPos="top"
                open={this.state.successNotified}
                onClose={() => {
                  this.props.logSuccess(null);
                  return this.props.konfirmasiKode();
                }}
                hideDuration={3000}
                message={this.props.successMessage}
                notificationType="success"
              />
            </form>
          </PaperCustom>
        </Box>
      </Wrapper>
    );
  }
}

VerifyConfirmPage.propTypes = {
  intl: PropTypes.object,
  history: PropTypes.object,
  kodeVerifikasi: PropTypes.number,
  errorMessage: PropTypes.string,
  successMessage: PropTypes.string,
  logSuccess: PropTypes.func,
  logError: PropTypes.func,
  konfirmasiKode: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  kodeAktifasi: makeSelectKodeAktifasi(),
  kodeFromServer: makeSelectKodeFromServer(),
  tokenVerifikasi: makeSelectTokenVerifikasi(),
  kodeVerifikasi: makeSelectKodeVerifikasi(),
  errorMessage: makeSelectError(),
  successMessage: makeSelectSuccess(),
});

function mapDispatchToProps(dispatch) {
  return {
    // dispatch,
    changeKodeAktifasi: kode => dispatch(changeKodeAktifasiAction(kode)),
    konfirmasiKode: () => dispatch(konfirmasiKodeAction()),
    logError: err => dispatch(logErrorAction(err)),
    logSuccess: msg => dispatch(logSuccessAction(msg)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'verifyConfirmPage', reducer });
const withSaga = injectSaga({ key: 'verifyConfirmPageSaga', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
  injectIntl,
  memo,
)(VerifyConfirmPage);
