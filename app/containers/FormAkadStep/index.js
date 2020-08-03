/**
 *
 * FormAkadStep
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
import {
  opsi_dokumen,
  opsi_propinsi,
  opsi_kota,
  opsi_kecamatan,
  opsi_kelurahan,
  stskwn,
  nmpsgn,
  noktpp,
  tglhrp,
  jmlank,
  uploaded,
  formAkadData
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
// import AutoComplete from '@material-ui/lab/Autocomplete';

import { STS_KWN } from './constants';

import {
  getOpsiDokumenAction,
  getOpsiPropinsiAction,
  getOpsiKotaAction,
  getOpsiKecamatanAction,
  getOpsiKelurahanAction,
  changeStskwnAction,
  changeNmpsgnAction,
  changeTglhrpAction,
  changeNoktppAction,
  changeJmlankAction,
  changePropinsiAction,
  changeKotaAction,
  changeKecamatanAction,
  changeKelurahanAction,
  addUploadedAction,
  submitFormAkadAction
} from './actions';

import styled from 'styled-components';
import validate from 'validate.js';
import { color, typography } from '../../styles/constants';

const Wrapper = styled(props => {
  return (
    <Grid
      container
      wrap="nowrap"
      direction="column"
      {...props}>
      {props.children}
    </Grid>
  );
})`
  && {    
    background-color:transparent;
    padding-top:0px;
    margin-top:12px;
    padding-left:0px;
    padding-right:0px;
  }
`;

class FormAkadStep extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: {
        nmpsgn: null,
        noktpp: null,
        jmlank: null,
        tglhrp: null,
      },
      isTriggered: false
    }
  }

  componentDidMount() {
    this.props.getOpsiDokumen();
    this.props.getOpsiPropinsi();
  }

  validateInput = (inputValue, inputName) => {
    const { intl } = this.props
    let isError = false;
    let errorMessage = null;
    if (validate.isEmpty(inputValue)) {
      isError = true;

      switch (inputName) {
        case 'nmpsgn':
          errorMessage = intl.formatMessage(messages.empty_nmpsgn);
          break;
        case 'noktpp':
          errorMessage = intl.formatMessage(messages.empty_noktpp);
          break;
        case 'tglhrp':
          errorMessage = intl.formatMessage(messages.empty_tglhrp);
          break;
        default:
          errorMessage = null;
      }
    }

    this.setState(state => ({
      ...state,
      error: {
        ...state.error,
        [inputName]: errorMessage
      }
    }));

    return !isError;
  }

  handleFile = (event, idberk) => {
    if (!!event.target.files && !!event.target.files[0]) {
      const objectUrl = URL.createObjectURL(event.target.files[0]);
      const file = event.target.files[0];
      return this.props.addUploaded(idberk, file, objectUrl);
    }
    return false;
  }

  handleSubmit = event => {
    event.preventDefault();
    const {
      nmpsgn,
      tglhrp,
      noktpp
    } = this.props;

    this.setState(prevState => ({
      ...prevState,
      isTriggered: true
    }));

    if (
      this.validateInput(nmpsgn, 'nmpsgn') &&
      this.validateInput(noktpp, 'noktpp') &&
      this.validateInput(tglhrp, 'tglhrp' &&
        this.props.uploaded.length > 0)) {
      // submit
      console.log('submitted');
      this.props.submitFormAkad();
    } else {
      console.log('not submitted');
    }

    return false;

  }

  handlePropinsi = (value) => {
    this.props.changePropinsi(value);
    this.props.getOpsiKota();
  }

  handleKota = (value) => {
    this.props.changeKota(value);
    this.props.getOpsiKecamatan();
  }

  handleKecamatan = (value) => {
    this.props.changeKecamatan(value);
    this.props.getOpsiKelurahan();
  }

  handleKelurahan = (value) => {
    this.props.changeKelurahan(value);
  }

  render() {

    const {
      intl,
      opsi_propinsi,
      opsi_kota,
      opsi_kecamatan,
      opsi_kelurahan,
      changeStskwn,
      changeJmlank,
      changeNmpsgn,
      changeTglhrp,
      changeNoktpp,      
      formAkadData,

    } = this.props;

    const { error, isTriggered } = this.state;

    return (
      <Wrapper>

        <form autoComplete="off">
          <Typography
            variant="h6"            
            style={{
              fontFamily: typography.fontFamily,
              fontSize: 14,
              fontWeight: 'bold',
              textTransform: 'capitalize'
            }}>
            {intl.formatMessage(messages.form_title)}
          </Typography>
          <Typography
            variant="subtitle2"
            gutterBottom
            style={{
              fontFamily: typography.fontFamily,
              fontSize: 12,
              fontWeight: 'normal',
              textTransform: 'capitalize',
              marginBottom:20
            }}>
            {intl.formatMessage(messages.form_description)}
          </Typography>

          <FormControl fullWidth margin="dense">
            <InputLabel
              color="secondary"
              shrink
              style={{
                position: 'absolute',
                left: 13,
                top: -8
              }}>
              {intl.formatMessage(messages.status_pernikahan)}
            </InputLabel>
            <Select
              id="stskwn"
              name="stskwn"
              variant="outlined"
              margin="dense"
              color="secondary"
              labelWidth={130}
              fullWidth
              value={this.props.stskwn}
              displayEmpty
              onChange={evt => {
                return changeStskwn(evt.target.value);
              }}
              style={{
                fontFamily: typography.fontFamily,
                fontSize: '13px',
                textTransform: 'lowercase'
              }}>
              {
                STS_KWN.map((item, i) => (
                  <MenuItem
                    key={`item-stskwn-${i}`}
                    value={item.ID}
                    style={{
                      fontFamily: typography.fontFamily,
                      fontSize: '13px',
                      textTransform: 'lowercase'
                    }}>
                    {item.NMSTAT}
                  </MenuItem>
                ))
              }
            </Select>
          </FormControl>

          <TextField
            id="NMPSGN"
            name="NMPSGN"
            color="secondary"
            fullWidth
            InputLabelProps={{ shrink: true }}
            variant="outlined"
            label={intl.formatMessage(messages.nmpsgn)}
            margin="dense"
            value={this.props.nmpsgn}
            disabled={this.props.stskwn === 1 ? true : false}
            onChange={evt => {
              if (isTriggered) {
                this.validateInput(evt.target.value, 'nmpsgn');
              }
              return changeNmpsgn(evt.target.value);
            }}
            error={!!error.nmpsgn}
            helperText={error.nmpsgn}
            style={{
              fontFamily: typography.fontFamily,
              fontSize: '13px',
              textTransform: 'lowercase'
            }} />

          <TextField
            id="noktpp"
            name="noktpp"
            type="number"
            color="secondary"
            fullWidth
            InputLabelProps={{ shrink: true }}
            variant="outlined"
            label={intl.formatMessage(messages.noktpp)}
            margin="dense"
            value={this.props.noktpp}
            disabled={this.props.stskwn === 1 ? true : false}
            onChange={evt => {
              if (isTriggered) {
                this.validateInput(evt.target.value, 'noktpp');
              }
              return changeNoktpp(evt.target.value);
            }}
            error={!!error.noktpp}
            helperText={error.noktpp}
            style={{
              fontFamily: typography.fontFamily,
              fontSize: '13px',
              textTransform: 'lowercase'
            }} />

          <TextField
            id="tglhrp"
            name="tglhrp"
            type="date"
            fullWidth
            color="secondary"
            InputLabelProps={{ shrink: true }}
            label={intl.formatMessage(messages.tglhrp)}
            labelwidth={110}
            variant="outlined"
            margin="dense"
            value={this.props.tglhrp}
            disabled={this.props.stskwn === 1 ? true : false}
            onChange={evt => {
              if (isTriggered) {
                this.validateInput(evt.target.value, 'tglhrp');
              }
              return changeTglhrp(evt.target.value);
            }}
            error={!!error.tglhrp}
            helperText={error.tglhrp}
            style={{
              fontFamily: typography.fontFamily,
              fontSize: '13px',
              textTransform: 'lowercase'
            }} />

          <TextField
            id="tglhrp"
            name="tglhrp"
            type="number"
            fullWidth
            color="secondary"
            InputLabelProps={{ shrink: true }}
            label={intl.formatMessage(messages.jmlank)}
            labelwidth={110}
            variant="outlined"
            margin="dense"
            value={this.props.jmlank}
            disabled={this.props.stskwn === 1 ? true : false}
            onChange={evt => {
              if (isTriggered) {
                this.validateInput(evt.target.value, 'jmlank');
              }
              return changeJmlank(evt.target.value);
            }}
            error={!!error.jmlank}
            helperText={error.jmlank}
            style={{
              fontFamily: typography.fontFamily,
              fontSize: '13px',
              textTransform: 'lowercase'
            }} />

          <FormControl
            margin="dense"
            fullWidth>
            <InputLabel
              id="propinsi"
              shrink
              color="secondary"
              style={{
                position: 'absolute',
                left: 14,
                top: -5
              }}>
              {intl.formatMessage(messages.opsiPropinsi)}
            </InputLabel>
            <Select
              id="propinsi"
              labelId="propinsi"
              labelWidth={60}
              value={formAkadData.idprop}
              onChange={evt => this.handlePropinsi(evt.target.value)}
              displayEmpty
              variant="outlined"
              margin="dense"
              color="secondary"
              fullWidth
              style={{
                fontFamily: typography.fontFamily,
                fontSize: '14px',
                textTransform: 'lowercase'
              }}>
              {
                opsi_propinsi.map((item, i) => (
                  <MenuItem
                    key={`item-stskwn-${i}`}
                    value={item.idprop}
                    style={{
                      fontFamily: typography.fontFamily,
                      fontSize: '13px',
                      textTransform: 'lowercase'
                    }}>
                    {item.nmprop}
                  </MenuItem>
                ))
              }
            </Select>
          </FormControl>

          <FormControl
            margin="dense"
            fullWidth>
            <InputLabel
              id="kota"
              shrink
              color="secondary"
              style={{
                position: 'absolute',
                left: 14,
                top: -6
              }}>
              {intl.formatMessage(messages.opsiKota)}
            </InputLabel>
            <Select
              id="kota"
              labelId="kota"
              labelWidth={120}
              value={formAkadData.idkota}
              onChange={evt => this.handleKota(evt.target.value)}
              displayEmpty
              variant="outlined"
              margin="dense"
              color="secondary"
              fullWidth
              style={{
                fontFamily: typography.fontFamily,
                fontSize: '14px',
                textTransform: 'lowercase'
              }}>
              {
                opsi_kota.map((item, i) => (
                  <MenuItem
                    key={`item-stskwn-${i}`}
                    value={item.idkota}
                    style={{
                      fontFamily: typography.fontFamily,
                      fontSize: '13px',
                      textTransform: 'lowercase'
                    }}>
                    {item.nmkota}
                  </MenuItem>
                ))
              }
            </Select>
          </FormControl>

          <FormControl
            margin="dense"
            fullWidth>
            <InputLabel
              id="kecamatan"
              shrink
              color="secondary"
              style={{
                position: 'absolute',
                left: 14,
                top: -6
              }}>
              {intl.formatMessage(messages.opsiKecamatan)}
            </InputLabel>
            <Select
              id="kecamatan"
              labelId="kecamatan"
              labelWidth={85}
              value={formAkadData.idkecm}
              onChange={evt => this.handleKecamatan(evt.target.value)}
              displayEmpty
              variant="outlined"
              margin="dense"
              color="secondary"
              fullWidth
              style={{
                fontFamily: typography.fontFamily,
                fontSize: '14px',
                textTransform: 'lowercase'
              }}>
              {
                opsi_kecamatan.map((item, i) => (
                  <MenuItem
                    key={`item-stskwn-${i}`}
                    value={item.idkecm}
                    style={{
                      fontFamily: typography.fontFamily,
                      fontSize: '13px',
                      textTransform: 'lowercase'
                    }}>
                    {item.nmkecm}
                  </MenuItem>
                ))
              }
            </Select>
          </FormControl>

          <FormControl
            margin="dense"
            fullWidth>
            <InputLabel
              id="kelurahan"
              shrink
              color="secondary"
              style={{
                position: 'absolute',
                left: 14,
                top: -7
              }}>
              {intl.formatMessage(messages.opsiKelurahan)}
            </InputLabel>
            <Select
              id="kelurahan"
              labelId="kelurahan"
              labelWidth={75}
              value={formAkadData.idkelr}
              onChange={evt => this.handleKelurahan(evt.target.value)}
              displayEmpty
              variant="outlined"
              margin="dense"
              color="secondary"
              fullWidth
              style={{
                fontFamily: typography.fontFamily,
                fontSize: '14px',
                textTransform: 'lowercase'
              }}>
              {
                opsi_kelurahan.map((item, i) => (
                  <MenuItem
                    key={`item-stskwn-${i}`}
                    value={item.idkelr}
                    style={{
                      fontFamily: typography.fontFamily,
                      fontSize: '13px',
                      textTransform: 'lowercase'
                    }}>
                    {item.nmkelr}
                  </MenuItem>
                ))
              }
            </Select>
          </FormControl>

          {this.props.opsi_dokumen.map((item, i) => (
            <Button
              key={`dok-${i}`}
              color="primary"
              fullWidth
              variant="outlined"
              component="label"
              onChange={evt => this.handleFile(evt, item.IDBERK)}
              style={{
                marginTop:10,
                marginBottom:10
              }}>
              {`upload ${item.NMBERK}`}
              <input
                id={item.NMBERK}
                name={item.NMBERK}
                type="file"
                multiple
                accept="image/x-png,image/jpeg"
                style={{ display: 'none' }} />
            </Button>
          ))}

          {this.props.uploaded.map((item, i) => (
            <Grid style={{ marginTop: 5, width: '70px', height: '60px' }}>
              <Card raised={false}>
                <CardActionArea>
                  <CardMedia key={`img-${i}`} image={`${item.objectURL}`} style={{ height: '60px' }} />
                </CardActionArea>
              </Card>
            </Grid>
          ))}

          <Button
            variant="contained"
            color="primary"
            fullWidth
            disableElevation            
            onClick={this.handleSubmit}
            style={{
              marginTop: 5
            }}>
            {intl.formatMessage(messages.btnSubmit)}
          </Button>

        </form>

      </Wrapper>
    );
  }
}

FormAkadStep.propTypes = {
  // dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  // formAkadStep: makeSelectFormAkadStep(),
  opsi_dokumen: opsi_dokumen(),
  opsi_propinsi: opsi_propinsi(),
  opsi_kota: opsi_kota(),
  opsi_kecamatan: opsi_kecamatan(),
  opsi_kelurahan: opsi_kelurahan(),
  stskwn: stskwn(),
  nmpsgn: nmpsgn(),
  noktpp: noktpp(),
  tglhrp: tglhrp(),
  jmlank: jmlank(),
  uploaded: uploaded(),
  formAkadData: formAkadData()
});

function mapDispatchToProps(dispatch) {
  return {
    getOpsiDokumen: () => dispatch(getOpsiDokumenAction()),
    getOpsiPropinsi: () => dispatch(getOpsiPropinsiAction()),
    getOpsiKota: () => dispatch(getOpsiKotaAction()),
    getOpsiKecamatan: () => dispatch(getOpsiKecamatanAction()),
    getOpsiKelurahan: () => dispatch(getOpsiKelurahanAction()),
    changeStskwn: (value) => dispatch(changeStskwnAction(value)),
    changeNmpsgn: (value) => dispatch(changeNmpsgnAction(value)),
    changeTglhrp: (value) => dispatch(changeTglhrpAction(value)),
    changeNoktpp: (value) => dispatch(changeNoktppAction(value)),
    changeJmlank: (value) => dispatch(changeJmlankAction(value)),
    changePropinsi: (idprop) => dispatch(changePropinsiAction(idprop)),
    changeKota: (idkota) => dispatch(changeKotaAction(idkota)),
    changeKecamatan: (idkecm) => dispatch(changeKecamatanAction(idkecm)),
    changeKelurahan: (idkelr) => dispatch(changeKelurahanAction(idkelr)),
    addUploaded: (idberk, file, objectURL) => dispatch(addUploadedAction(idberk, file, objectURL)),
    submitFormAkad: () => dispatch(submitFormAkadAction())
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'formAkadStep', reducer });
const withSaga = injectSaga({ key: 'formAkadStepSaga', saga });

export default compose(
  withConnect,
  withReducer,
  withSaga,
  injectIntl,
  memo,
)(FormAkadStep);
