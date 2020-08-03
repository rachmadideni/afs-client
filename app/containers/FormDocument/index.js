/**
 *
 * FormDocument
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
import Backdrop from '@material-ui/core/Backdrop';

// import { createBlob, createObjectURL, base64StringToBlob } from 'blob-util';
import Camera from 'react-webcam';
import { color, typography } from '../../styles/constants';
import { getOpsiDokumenTahap1Action, uploadAction } from './actions';

import {
  makeSelectOpsiDokumenTahap1,
  makeSelectUploadedFiles,
} from '../FormSubmissionStep/selectors';

const Wrapper = styled(props => <Grid {...props} />)`
  && {
    background-color: transparent;
    padding-left: 0px;
    padding-right: 0px;
    padding-top: 5px;
  }
`;

const CardMediaStyled = styled(CardMedia)`
  && {
    height: 120px;
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

const blobToFile = (blob, filename) => {
  const newBlob = blob;
  newBlob.lastModifiedDate = new Date();
  newBlob.name = filename;
  return newBlob;
};

class FormDocument extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      backdropOpen: false,
      isPhotoCaptured: false,
      photo: null,
      orientation: 'portrait',
    };
    this.cameraRef = React.createRef();
  }

  componentDidMount() {
    this.props.getOpsiDokumenTahap1();
    window.addEventListener('orientationchange', this.setOrientation, false);
    // navigator.mediaDevices
    //   .enumerateDevices()
    //   .then(result => console.log(result));
    // navigator.mediaDevices.getUserMedia({video: true}).then(result=>console.log(result))
  }

  componentWillUnmount() {
    // console.log(this.cameraRef.current)
    window.removeEventListener('orientationchange', this.setOrientation, false);
  }

  setOrientation = () => {
    if (window.matchMedia('(orientation:portrait)').matches) {
      this.setState({
        orientation: 'landscape',
        backdropOpen: false,
      });
    }

    if (window.matchMedia('(orientation:landscape)').matches) {
      this.setState({
        orientation: 'landscape',
      });
    }
  };

  // onSingleUpload( evt, statename, statefile){
  //   let file = evt.target.files[0];
  //   let filename = evt.target.files[0].name;

  //   this.getAsBase64(file).then(base64=>{
  //     this.setState({
  //       [statename]:filename,
  //       [statefile]:base64
  //     });
  //   })
  // }

  getAsBase64 = file =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
      reader.readAsDataURL(file);
    });

  handleFile = (event, idberk) => {
    if (!!event.target.files && !!event.target.files[0]) {
      // console.log(event.target.files);
      const objectURL = URL.createObjectURL(event.target.files[0]);
      const file = event.target.files[0];
      return this.props.upload(idberk, file, objectURL);
      // const base64Img = this.getAsBase64(event.target.files[0]).then(base64 => base64);
    }
    return false;
  };

  toggleCameraBackdrop = () => {
    // do not access camera yet. instead open modal for taking pictures
    this.setState(state => ({
      ...state,
      backdropOpen: !state.backdropOpen,
    }));
  };

  // openCamera = () => {
  //   const camera = this.cameraRef.current;
  //   const photo = camera.getScreenshot();
  // };

  takePhoto = () => {
    // const camera = this.cameraRef;
    const photo = this.cameraRef.current.getScreenshot(); // return as base64
    const canvas = this.cameraRef.current.getCanvas(); // return as canvas

    canvas.toBlob(blob => {
      // console.log(blob);
      const fileFromBlob = blobToFile(blob, 'foto-selfie.png');
      const objectURLFromBlob = URL.createObjectURL(fileFromBlob);
      // console.log(fileFromBlob)
      this.setState({ photo });
      this.props.upload(8, fileFromBlob, objectURLFromBlob);
      this.toggleCameraBackdrop();
    });
  };

  render() {
    const { opsiDokumenTahap1 } = this.props;

    return (
      <Wrapper
        container
        wrap="nowrap"
        direction="column"
        alignItems="flex-end"
        justify="flex-end"
      >
        <Grid item>
          <form autoComplete="off">
            {opsiDokumenTahap1
              .filter(doc => doc.IDBERK < 8)
              .map(item => (
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
                  >
                    {item.NMBERK}

                    <input
                      id={item.IDBERK}
                      name={item.NMBERK}
                      type="file"
                      multiple
                      accept="image/x-png,image/jpeg"
                      style={{ display: 'none' }}
                    />
                  </Button>
                </FormControl>
              ))}
            {/* Tombol Selfie */}
            {/* di disable sementara karena https belum jalan */}
            {/* <FormControl margin="dense" fullWidth>
              <Button
                color="primary"
                variant="outlined"
                fullWidth
                onClick={() => {
                  this.toggleCameraBackdrop();                  
                }}
              >
                Foto Selfie
              </Button>
            </FormControl> */}

            {this.state.backdropOpen && (
              <Backdrop
                style={{ zIndex: 5000 }}
                open={this.state.backdropOpen}
                onClick={() => {
                  // this.toggleCameraBackdrop()
                  // this.openCamera;
                }}
              >
                <Grid
                  container
                  direction="column"
                  alignItems="center"
                  justify="center"
                >
                  <Grid item>
                    <Camera
                      ref={this.cameraRef}
                      audio={false}
                      screenshotFormat="image/png"
                      width={window.innerWidth}
                      height={window.innerHeight}
                      mirrored={false}
                      screenshotQuality={1}
                      videoConstraints={{
                        facingMode: 'user',
                      }}
                      capture={() => this.takePhoto()}
                    />
                  </Grid>
                  <Grid
                    item
                    style={{
                      position: 'absolute',
                      top: 10,
                      right: 10,
                    }}
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => this.takePhoto()}
                    >
                      ambil foto selfie
                    </Button>
                  </Grid>
                </Grid>
              </Backdrop>
            )}

            {/* 
                RENDER FILE SETELAH USER PICK DOKUMEN (dari storage atau hasil jepret kamera)
              */}

            <Grid
              container
              wrap="wrap"
              direction="row"
              justify="space-between"
              alignItems="flex-start"
            >
              {this.props.uploadedFiles.map((item, index) => (
                <Grid item style={{ marginBottom: 15 }}>
                  <Grid
                    style={{
                      marginTop: 12,
                      width: '130px',
                      height: '120px',
                    }}
                  >
                    <Card raised={false}>
                      <CardActionArea>
                        <CardMediaStyled image={`${item.objectURL}`} />
                        <Overlay>
                          <TextOverlay>
                            {opsiDokumenTahap1[index].NMBERK}
                          </TextOverlay>
                        </Overlay>
                      </CardActionArea>
                    </Card>
                  </Grid>
                </Grid>
              ))}
              {this.state.photo && (
                <Grid item style={{ marginBottom: 15 }}>
                  <Grid
                    style={{
                      marginTop: 12,
                      width: '130px',
                      height: '120px',
                    }}
                  >
                    <Card raised={false}>
                      <CardActionArea>
                        {/* <CardMediaStyled image={`${window.URL.createObjectURL(this.state.photo)}`} /> */}
                        <img
                          alt="foto_selfie"
                          src={this.state.photo}
                          style={{ width: '100%', height: '120px' }}
                        />
                        <Overlay>
                          <TextOverlay>Foto Selfie</TextOverlay>
                        </Overlay>
                      </CardActionArea>
                    </Card>
                  </Grid>
                </Grid>
              )}
            </Grid>
          </form>
        </Grid>
      </Wrapper>
    );
  }
}

FormDocument.propTypes = {
  opsiDokumenTahap1: PropTypes.array,
  uploadedFiles: PropTypes.array,
  getOpsiDokumenTahap1: PropTypes.func,
  upload: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  opsiDokumenTahap1: makeSelectOpsiDokumenTahap1(),
  uploadedFiles: makeSelectUploadedFiles(),
});

function mapDispatchToProps(dispatch) {
  return {
    getOpsiDokumenTahap1: () => dispatch(getOpsiDokumenTahap1Action()),
    upload: (idberk, file, objectURL) =>
      dispatch(uploadAction(idberk, file, objectURL)),
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
)(FormDocument);
