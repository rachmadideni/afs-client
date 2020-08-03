/**
 *
 * SectionPinjaman
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import Grid from '@material-ui/core/Grid';
import confetti from 'images/confetti.png';
import makeSelectSectionPinjaman from './selectors';
import { makeSelectStatusAplikasi } from '../MainPage/selectors';
import messages from './messages';

import {
  // HeaderText,
  GridWrapper,
  ContentText,
  ActionButton,
} from './components';

import { DAFTAR_DOKUMEN } from './constants';

import {
  downloadAKadAction,
  downloadSpnAction,
  downloadSrpAction,
  downloadSpgkAction,
} from '../MainPage/actions';

class SectionPinjaman extends React.Component {
  //
  handleFormTahap1 = () => {
    const { history, statusAplikasi } = this.props;
    if (statusAplikasi === 0) {
      return history.replace('/application-form/step/customer/installment');
    }
    return false;
  };

  handleFormTahap2 = () => {
    const { history, statusAplikasi } = this.props;
    if (statusAplikasi === 2) {
      return history.replace('/akad');
    }
    return false;
  };

  handleDownloadDokumen = type => {
    if (type === 'akad') {
      this.props.downloadAKad();
    } else if (type === 'spn') {
      this.props.downloadSpn();
    } else if (type === 'srp') {
      this.props.downloadSrp();
    } else if (type === 'spgk') {
      this.props.downloadSpgk();
    }
  };

  render() {
    const { intl, statusAplikasi } = this.props;

    return (
      <Grid
        container
        wrap="nowrap"
        direction="column"
        style={{
          marginTop: 10,
        }}
      >
        {/* 
        <HeaderText gutterBottom>
          {intl.formatMessage(messages.header)}
        </HeaderText> */}

        <GridWrapper>
          {statusAplikasi === 0 && (
            <Grid
              container
              wrap="nowrap"
              direction="column"
              alignItems="center"
              justify="center"
            >
              <div style={{ marginBottom: 10 }}>
                <img alt="confetti" src={confetti} />
              </div>
              <ContentText align="center">
                {intl.formatMessage(messages.firstCustomer)}
              </ContentText>
              <Grid
                item
                style={{
                  paddingTop: 10,
                }}
              >
                <ActionButton
                  variant="outlined"
                  color="primary"
                  fullWidth
                  onClick={this.handleFormTahap1}
                >
                  {intl.formatMessage(messages.actionButton)}
                </ActionButton>
              </Grid>
            </Grid>
          )}

          {/* user baru */}
          {/*
            statusAplikasi === 0 && (
            <React.Fragment>
              <ContentText align="left">
                {intl.formatMessage(messages.tidakAdaPinjaman)}
              </ContentText>
              <Grid
                item
                style={{
                  paddingTop: 10,
                }}
              >
                <ActionButton
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={this.handleFormTahap1}
                >
                  {intl.formatMessage(messages.actionButton)}
                </ActionButton>
              </Grid>
            </React.Fragment>
              ) */}

          {/* user akan mengisi form tahap ke dua */}
          {statusAplikasi === 1 && (
            <React.Fragment>
              <ContentText align="left">
                {intl.formatMessage(messages.tahapPengajuan)}
              </ContentText>
            </React.Fragment>
          )}

          {/* user menunggu approval */}
          {statusAplikasi === 2 && (
            <React.Fragment>
              <ContentText align="left">
                {intl.formatMessage(messages.tahapPaskaApproval)}
              </ContentText>
              <Grid
                item
                style={{
                  paddingTop: 10,
                }}
              >
                <ActionButton
                  variant="contained"
                  color="primary"
                  fullWidth
                  disabled={statusAplikasi > 0 && statusAplikasi === 1}
                  onClick={this.handleFormTahap2}
                >
                  {intl.formatMessage(messages.actionButtonStep2)}
                </ActionButton>
              </Grid>
            </React.Fragment>
          )}

          {statusAplikasi === 3 && (
            <React.Fragment>
              <ContentText align="left">
                {intl.formatMessage(messages.tahapDownloadDokumen)}
              </ContentText>
              <Grid
                item
                style={{
                  paddingTop: 10,
                }}
              >
                {DAFTAR_DOKUMEN.map(item => (
                  <ActionButton
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={() => this.handleDownloadDokumen(item.type)}
                    style={{
                      marginBottom: 4,
                      fontSize: 11,
                    }}
                  >
                    {item.name}
                  </ActionButton>
                ))}
              </Grid>
            </React.Fragment>
          )}
        </GridWrapper>
      </Grid>
    );
  }
}

SectionPinjaman.propTypes = {
  intl: PropTypes.object,
  history: PropTypes.object,
  statusAplikasi: PropTypes.number,
  downloadAKad: PropTypes.func,
  downloadSpn: PropTypes.func,
  downloadSrp: PropTypes.func,
  downloadSpgk: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  sectionPinjaman: makeSelectSectionPinjaman(),
  statusAplikasi: makeSelectStatusAplikasi(),
});

function mapDispatchToProps(dispatch) {
  return {
    downloadAKad: () => dispatch(downloadAKadAction()),
    downloadSpn: () => dispatch(downloadSpnAction()),
    downloadSrp: () => dispatch(downloadSrpAction()),
    downloadSpgk: () => dispatch(downloadSpgkAction()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  injectIntl,
  memo,
)(SectionPinjaman);
