/**
 *
 * Pinjaman
 *
 */

import React, { memo } from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import makeSelectPinjaman from './selectors';

import Grid from "@material-ui/core/Grid";
import PerhitunganAngsuran from '../PerhitunganAngsuran/Loadable';

class Pinjaman extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     activeStep: 0,
  //   };
  // }

  // getSteps = () => {
  //   return ['plafond', 'berkas', 'pengajuan'];
  // };

  render() {
    // const { activeStep } = this.state;
    // const steps = this.getSteps();

    return (
      <Grid
        container
        wrap="nowrap"
        direction="column"
        style={{
          maxWidth: 330,
          height: '100%',
          paddingTop: 0,
          backgroundColor:"pink"
        }}
      >
        <Grid
          item
          xs
          style={{
            height: '100%',
          }}
        >
          <Grid
            item
            xs
            style={{
              paddingLeft: 10,
              paddingTop: 0,
            }}
          >
            <Switch>
              <Route
                path="/application-form/step/customer/installment"
                render={routeProps => <PerhitunganAngsuran {...routeProps} />}
              />
            </Switch>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  pinjaman: makeSelectPinjaman(),
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
)(Pinjaman);
