import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { injectIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';

import TextField from 'components/TextField';
import BtnCustom from 'components/BtnCustom';
import AppLoader from 'components/AppLoader';
import UserAgreementLabel from "components/UserAgreementLabel";

import { JENIS_PENGAJUAN } from './constants';

import {
  changeJenisPengajuanAction,
  changeSubPengajuanAction,
  changePemanfaatanLainAction,
  getOpsiJenisPengajuanAction,
} from './actions';

import { mapPengajuanAction } from '../FormSubmissionStep/actions';

import messages from './messages';

import {
  makeSelectPengajuan,
  makeSelectOpsiJenisPengajuan,
  makeSelectFormSubmitted,
  // makeSelectNasabah,
} from '../FormSubmissionStep/selectors';

const Wrapper = styled(props => <Grid {...props} />)`
  && {
    background-color: transparent;
    padding-left: 0px;
    padding-right: 0px;
    padding-top: 10px;
  }`;

class FormPengajuan extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pemanfaatanLainnyaIsActive: false,
      userSetuju: false,
    };
    this.renderTujuanPengajuan = this.renderTujuanPengajuan.bind(this);
  }

  componentDidMount() {
    this.props.getOpsiJenisPengajuan();
  }

  renderTujuanPengajuan() {
    const { jenis } = this.props.pengajuan;
    const { opsiJenisPengajuan } = this.props;
    const filteredSub =
      jenis === 1
        ? opsiJenisPengajuan.filter(item => item.KDPRDK === 1)
        : opsiJenisPengajuan.filter(item => item.KDPRDK === 2);

    const menuItem = filteredSub.map((item,i) => (
      <MenuItem
        key={`item-${i}-${item.KDPRDK}`}
        value={item.IDTUJU}
        style={{ fontSize: 14 }}
      >
        {item.NMTUJU}
      </MenuItem>
    ));

    return menuItem;
  }

  handlePemanfaatanLainnya = value => {
    const { opsiJenisPengajuan } = this.props;
    this.props.changeSubPengajuan(value);
    const selected = opsiJenisPengajuan.filter(item => item.IDTUJU === value);
    if (selected.length > 0) {
      const text = selected[0].NMTUJU;
      if (text.includes('lainnya')) {
        this.setState(state => ({
          ...state,
          pemanfaatanLainnyaIsActive: true,
        }));
      } else {
        this.setState(state => ({
          ...state,
          pemanfaatanLainnyaIsActive: false,
        }));
        return this.props.changePemanfaatanLain('');
      }
    }
    return false;
  };

  checkPengajuanForm = pengajuan => {
    if (pengajuan.jenis && pengajuan.tujuan && this.state.userSetuju) {
      return false;
    }
    return true;
  };

  handleSubmit = evt => {
    evt.preventDefault();
    this.props.mapPengajuan();
  };

  handleAgreement = evt => {
    this.setState({
      userSetuju: evt.target.checked,
    });
  };

  render() {
    const {
      intl,
      pengajuan,
      changeJenisPengajuan,
      changePemanfaatanLain,
      formSubmitted,
    } = this.props;

    return (
      <Wrapper container wrap="nowrap" direction="column" alignItems="center">
        <AppLoader
          open={formSubmitted}
          type="linear"
          message="Mohon Tunggu"
        />

        <Grid item style={{ width: '100%' }}>
          <form autoComplete="off">
            <TextField
              id="jenpeng"
              name="jenpeng"
              select
              fullWidth
              label={intl.formatMessage(messages.jenis_manfaat)}
              variant="outlined"
              margin="dense"
              value={pengajuan.jenis}
              onChange={evt => changeJenisPengajuan(evt.target.value)}
            >
              {JENIS_PENGAJUAN.map((item,i) => (
                <MenuItem key={`JP-${i}`} value={item.value} style={{ fontSize: 14 }}>
                  {item.text}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              id="subpeng"
              name="subpeng"
              select
              fullWidth
              variant="outlined"
              margin="dense"
              label={intl.formatMessage(messages.pemanfaatan)}
              value={pengajuan.tujuan}
              onChange={evt => {
                this.handlePemanfaatanLainnya(evt.target.value);
              }}
            >
              {this.renderTujuanPengajuan()}
            </TextField>

            <TextField
              id="lainnya"
              name="lainnya"
              color="secondary"
              fullWidth
              InputLabelProps={{ shrink: true }}
              variant="outlined"
              label={intl.formatMessage(messages.lainnya)}
              margin="dense"
              disabled={!this.state.pemanfaatanLainnyaIsActive}
              value={pengajuan.pemanfaatan_lain}
              onChange={evt => changePemanfaatanLain(evt.target.value)}
            />

            <UserAgreementLabel
              color="secondary"
              label="saya dengan ini menyetujui persyaratan yang berlaku dalam pembiayaan di Amanah Finance Syariah "
              name="userSetuju"
              control={
                <Checkbox
                  checked={this.state.userSetuju}
                  onChange={this.handleAgreement}
                />
              }
            />            

            <BtnCustom
              fullWidth
              variant="contained"
              color="primary"
              disabled={this.checkPengajuanForm(pengajuan)}
              onClick={this.handleSubmit}
              title={intl.formatMessage(messages.submit)}
            />
          </form>
        </Grid>
      </Wrapper>
    );
  }
}

FormPengajuan.propTypes = {
  intl: PropTypes.object,
  pengajuan: PropTypes.object,
  opsiJenisPengajuan: PropTypes.array,
  formSubmitted: PropTypes.bool,
  mapPengajuan: PropTypes.func,
  changeJenisPengajuan: PropTypes.func,
  changeSubPengajuan: PropTypes.func,
  changePemanfaatanLain: PropTypes.func,
  getOpsiJenisPengajuan: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  pengajuan: makeSelectPengajuan(),
  opsiJenisPengajuan: makeSelectOpsiJenisPengajuan(),
  formSubmitted: makeSelectFormSubmitted(),
  // nasabah: makeSelectNasabah(),
});

function mapDispatchToProps(dispatch) {
  return {
    changeJenisPengajuan: jenisPengajuan =>
      dispatch(changeJenisPengajuanAction(jenisPengajuan)),
    changeSubPengajuan: tujuanPengajuan =>
      dispatch(changeSubPengajuanAction(tujuanPengajuan)),
    changePemanfaatanLain: pemanfaatan =>
      dispatch(changePemanfaatanLainAction(pemanfaatan)),
    getOpsiJenisPengajuan: () => dispatch(getOpsiJenisPengajuanAction()),
    mapPengajuan: () => dispatch(mapPengajuanAction()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  injectIntl,
)(FormPengajuan);
