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
  formAkadData,
  makeSelectIsLoading,
  makeSelectProgressMessage,
  makeSelectProgressValue
} from './selectors';

import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import TextField from 'components/TextField'
import BtnCustom from 'components/BtnCustom';
import AppLoader from 'components/AppLoader';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
// import FormControl from '@material-ui/core/FormControl';
// import TextField from '@material-ui/core/TextField';
// import InputLabel from '@material-ui/core/InputLabel';
// import Select from '@material-ui/core/Select';

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
import Viewer from 'react-viewer';

const Wrapper = styled(props => {
  return (
    <Grid
      container
      wrap="nowrap"
      direction="column"
      alignItems="center"
      
      {...props}>
      {props.children}
    </Grid>
  );
})`
  && {    
    background-color:transparent;
    padding-top:0px;
    margin-top:12px;    
    padding-left:15px;
    padding-right:15px;
    height:100%;
  }
`;

const CardMediaStyled = styled(props => <CardMedia {...props} />)`
  && {
    height: 150px;
  }
`;

const Overlay = styled.div`
  display: flex;
  width: 100%;
  background-color: #000000;
  position: absolute;
  opacity: 0.7;
  z-index: 0;
  right: 0px;
  bottom: 0px;
  padding-left: 10px;
  padding-top: 5px;
  padding-bottom: 5px;
`;

const TextOverlay = styled(Typography)`
  && {
    font-family: ${typography.fontFamily};
    font-weight: bold;
    font-size: 10px;
    color: ${color.white};
    text-transform: capitalize;
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
      isTriggered: false,      
      isImageViewerOpen: false,
      activeImageIndex: 0
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
    let allowedType = ['image/png','image/jpg','image/jpeg'];
    if (!!event.target.files && !!event.target.files[0]) {
      let fileType = event.target.files[0].type;
      if(allowedType.indexOf(fileType) === -1){
        alert('file tidak didukung');
        return false;
        // show notification error       
      }
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

    if(this.props.stskwn === 2){
      if (
        this.validateInput(nmpsgn, 'nmpsgn') &&
        this.validateInput(noktpp, 'noktpp') &&
        this.validateInput(tglhrp, 'tglhrp' &&
          this.props.uploaded.length > 0)) {
        // submit
        console.log('submitted');
        this.props.submitFormAkad();
      }
    } else {
      console.log('submitted');
      this.props.submitFormAkad();
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
      isLoading,
      progressMessage,
      progressValue
    } = this.props;

    const { error, isTriggered } = this.state;

    return (
      <Wrapper>
        <Grid item>
        <AppLoader 
          open={isLoading} 
          type="linear"
          message="Mohon Tunggu"
          progress_message={progressMessage}
          progress_value={progressValue} />

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

          <TextField
            id="stskwn"
            name="stskwn"
            select
            variant="outlined"
            margin="dense"
            color="secondary"
            InputLabelProps={{ shrink: true }}
            label={intl.formatMessage(messages.status_pernikahan)}
            fullWidth
            value={this.props.stskwn}
            displayEmpty
            onChange={evt => {
              return changeStskwn(evt.target.value);
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
          </TextField>

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
            helperText={error.nmpsgn} />

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
            helperText={error.noktpp} />

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
            helperText={error.tglhrp} />

          <TextField
            id="jmlank"
            name="jmlank"
            type="number"
            fullWidth
            color="secondary"
            InputLabelProps={{ shrink: true }}
            label={intl.formatMessage(messages.jmlank)}            
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
            helperText={error.jmlank} />

          <TextField
            id="propinsi"
            name="propinsi"
            select
            InputLabelProps={{ shrink: true }}
            label={intl.formatMessage(messages.opsiPropinsi)}
            value={formAkadData.idprop}
            onChange={evt => this.handlePropinsi(evt.target.value)}
            displayEmpty
            variant="outlined"
            margin="dense"
            color="secondary"
            fullWidth>
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
          </TextField>          

          <TextField
            id="kota"
            name="kota"
            InputLabelProps={{ shrink: true }}
            label={intl.formatMessage(messages.opsiKota)}
            select            
            value={formAkadData.idkota}
            onChange={evt => this.handleKota(evt.target.value)}
            displayEmpty
            variant="outlined"
            margin="dense"
            color="secondary"
            fullWidth>
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
          </TextField>          

          <TextField
            id="kecamatan"
            name="kecamatan"
            select
            InputLabelProps={{ shrink: true }}
            label={intl.formatMessage(messages.opsiKecamatan)}            
            value={formAkadData.idkecm}
            onChange={evt => this.handleKecamatan(evt.target.value)}
            displayEmpty
            variant="outlined"
            margin="dense"
            color="secondary"
            fullWidth>
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
          </TextField>          

          <TextField
            id="kelurahan"
            name="kelurahan"
            select
            InputLabelProps={{ shrink: true }}
            label={intl.formatMessage(messages.opsiKelurahan)}
            value={formAkadData.idkelr}
            onChange={evt => this.handleKelurahan(evt.target.value)}
            displayEmpty
            variant="outlined"
            margin="dense"
            color="secondary"
            fullWidth>
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
          </TextField>

          {this.props.opsi_dokumen.map((item, i) => (
            <FormControl
              key={`upload-${item.IDBERK}`}
              margin="dense"
              fullWidth
            >
            <Button              
              color="primary"
              fullWidth
              variant="outlined"
              component="label"
              onChange={evt => this.handleFile(evt, item.IDBERK)}
              style={{
                marginTop:5,
                marginBottom:0
              }}>
              {item.NMBERK}
              <input
                id={item.NMBERK}
                name={item.NMBERK}
                type="file"
                multiple
                accept="image/x-png,image/jpeg"
                style={{ display: 'none',textAlign:"center" }} />
            </Button>
            </FormControl>
          ))}

          {this.props.uploaded.map((item, index) => (
            <Grid 
              key={`grid-berkas-${index}`}
              style={{ marginTop: 5, width: '100%', height: '150px' }}>
              <Card raised={false}>
                <CardActionArea>
                  <CardMediaStyled 
                    image={`${item.objectURL}`}
                    onClick={() => { 
                      this.setState({ 
                        isImageViewerOpen: true,
                        activeImageIndex:index
                      });                              
                    }} />
                  <Overlay>
                    <TextOverlay>
                      {this.props.opsi_dokumen[index].NMBERK}
                    </TextOverlay>
                  </Overlay>
                </CardActionArea>
              </Card>
            </Grid>
          ))}

          {this.props.uploaded.length > 0 && 
            <Viewer 
              visible={this.state.isImageViewerOpen} 
              onClose={()=>this.setState({ isImageViewerOpen:false })}                
              images={[{
                src:this.props.uploaded[this.state.activeImageIndex].objectURL                
              }]} 
              zIndex={8000}
              />
          }

          <Button
            variant="contained"
            color="primary"
            fullWidth
            disableElevation            
            onClick={this.handleSubmit}
            disabled={this.props.uploaded.length < this.props.opsi_dokumen.length}
            style={{
              marginTop: 5,
              marginBottom:100
            }}>
            {intl.formatMessage(messages.btnSubmit)}
          </Button>

        </form>
        </Grid>
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
  formAkadData: formAkadData(),
  isLoading: makeSelectIsLoading(),
  progressMessage:makeSelectProgressMessage(),
  progressValue:makeSelectProgressValue()
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
