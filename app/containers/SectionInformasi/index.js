/**
 *
 * SectionInformasi
 *
 */

import React, { memo } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import makeSelectSectionInformasi from './selectors';

export function SectionInformasi() {
  return (
    <Grid
      container
      wrap="nowrap"
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{
        backgroundColor: 'transparent',
        width: '100%',
      }}
    >
      <Grid item style={{ width: '100%', marginTop:20,borderRadius:6,padding:20,backgroundColor:"#FAFAFA" }}>
        <Typography variant="body2" align="center">
          untuk informasi lebih lanjut silahkan hubungi customer support kami melalui email <b>supporting@afs.co.id</b> <br/>atau melalui whatsapp <b>+62 811-4461-0777</b> 
        </Typography>
        {/* <Typography variant="h6" align="center" gutterBottom>
          Customer Services
        </Typography> */}
      </Grid>
      {/* <Grid item>
        <Typography variant="h6" align="center" gutterBottom>
          supporting@afs.co.id
        </Typography>
      </Grid> */}
    </Grid>
  );
}

SectionInformasi.propTypes = {
  // dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  sectionInformasi: makeSelectSectionInformasi(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(SectionInformasi);
