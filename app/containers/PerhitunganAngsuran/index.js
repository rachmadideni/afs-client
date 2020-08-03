/**
 *
 * PerhitunganAngsuran
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import {
  makeSelectGaji,
  makeSelectPlafon,
  makeSelectTenor,
  makeSelectMargin,
  makeSelectAngsuran,
  makeSelectParameter,
  makeSelectStepProgress,
} from 'containers/FormSubmissionStep/selectors';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Backdrop from '@material-ui/core/Backdrop';
import numeral from 'numeral';
import InstallmentSlider from 'components/InstallmentSlider';
import {
  changeGajiAction,
  changePlafonAction,
  changeTenorAction,
  changeAngsuranAction,
  getParamAction,
  changeNmarginAction,
  changeRateAssAction,
  changeByaadmAction,
} from './actions';

import { setSimulasiTourAction } from '../FormSubmissionStep/actions';

import messages from './messages';

// helpers function
import { calcInstallment, hitungNilaiMargin } from './helpers';

// components
import NumberInput from '../../components/NumberInput';
import { FormItemHeaderText, FormItemText } from './components';

import { color, typography } from '../../styles/constants';
// Tour
// import { TOUR_STEPS } from './constants';
// import Tour from 'reactour';

import { TourOpening } from '../../components/TourComponents';

class PerhitunganAngsuran extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: true,
    };
  }

  componentDidMount() {
    this.props.getParam(2); // 2=ijarah
    this.hitungAngsuran(this.props.plafon, this.props.margin, this.props.tenor);
    this.hitungNilaiMargin(
      this.props.plafon,
      this.props.margin,
      this.props.tenor,
    );
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.plafon !== this.props.plafon ||
      prevProps.tenor !== this.props.tenor
    ) {
      this.hitungAngsuran(
        this.props.plafon,
        this.props.margin,
        this.props.tenor,
      );
      this.hitungNilaiMargin(
        this.props.plafon,
        this.props.margin,
        this.props.tenor,
      );
      this.updateMarginRateAssByaadm();
    }
  }

  showBackDrop = () => (
    <Backdrop open={this.state.isOpen} onClick={this.handleBackdrop}>
      <Typography align="center">
        gunakan tombol panah di sebelah kanan atas untuk berpindah layar
        berikutnya dan tombol panah sebelah kiri untuk kembali ke layar
        sebelumnya
      </Typography>
    </Backdrop>
  );

  handleBackdrop = () => {
    this.setState(state => ({
      ...state,
      isOpen: !state.isOpen,
    }));
  };

  hitungAngsuran = (plafon, margin, tenor) => {
    const angsuran = calcInstallment(plafon, margin, tenor);
    return this.props.changeAngsuran(angsuran);
  };

  hitungNilaiMargin = (plafon, margin, tenor) => {
    const nilaiMargin = hitungNilaiMargin(plafon, margin, tenor);
    return this.props.changeNmargin(nilaiMargin);
  };

  updateMarginRateAssByaadm = () => {
    const { ASURANSI, B_ADMIN } = this.props.parameter;
    this.props.changeRateAss(ASURANSI);
    this.props.changeByaadm(B_ADMIN);
  };

  render() {
    const { intl, parameter } = this.props;

    return (
      <Grid
        container
        wrap="nowrap"
        direction="column"
        alignItems="center"
        style={{
          backgroundColor: 'transparent',
        }}
      >
        {this.props.stepProgress === 0 && this.props.gaji === 0 ? (
          <TourOpening
            open={this.state.isOpen}
            onTourClose={this.handleBackdrop}
          />
        ) : null}
        <Grid
          item
          style={{
            marginTop: 10,
          }}
        >
          <FormItemHeaderText>
            {intl.formatMessage(messages.pendapatanNet)}
          </FormItemHeaderText>

          <NumberInput
            id="gaji"
            name="gaji"
            value={this.props.gaji || 0}
            label="gaji"
            allowNegative={false}
            variant="outlined"
            fullWidth
            margin="normal"
            onChange={value => {
              this.props.changeGaji(parseInt(value, 0));
            }}
          />

          <Grid item xs style={{ marginTop: 15 }}>
            <FormItemHeaderText align="left">
              {intl.formatMessage(messages.plafon)}
            </FormItemHeaderText>
          </Grid>
          <Grid item>            
            <FormItemText align="left">
              {`${numeral(this.props.plafon).format('0,0')} ${intl.formatMessage(messages.juta)}`}
            </FormItemText>
          </Grid>

          <InstallmentSlider
            color="secondary"
            value={this.props.plafon}
            min={parameter ? parameter.MIN_PLAFON : 10000000}
            max={parameter ? parameter.MAX_PLAFON : 50000000}
            step={parameter ? parameter.STEP_PLAFON : 5000000}
            valueLabelDisplay="off"
            getAriaValueText={() => 'valueText'}
            marks={false}
            onChangeCommitted={(e, val) => this.props.changePlafon(val)}
            disabled={!(this.props.gaji > 0)}
          />

          <Grid item xs>
            <FormItemHeaderText gutterBottom>
              {intl.formatMessage(messages.tenor)}
            </FormItemHeaderText>
          </Grid>
          <Grid item xs>
            <FormItemText>
              {`${this.props.tenor} ${intl.formatMessage(messages.bulan)}`}
            </FormItemText>
          </Grid>
          <InstallmentSlider
            color="secondary"
            value={this.props.tenor}
            min={parameter ? parameter.MIN_TENOR : 12}
            max={parameter ? parameter.MAX_TENOR : 36}
            step={parameter ? parameter.STEP_TENOR : 12}
            valueLabelDisplay="off"
            getAriaValueText={() => 'valueText'}
            marks={false}
            onChangeCommitted={(e, val) => this.props.changeTenor(val)}
            disabled={!(this.props.gaji > 0)}
          />
          <Grid item xs>
            <FormItemHeaderText gutterBottom>
              {intl.formatMessage(messages.angsuran)}
            </FormItemHeaderText>
          </Grid>
          <Grid item xs>
            <FormItemText>
              {`${intl.formatMessage(messages.rp)} `}
              {numeral(this.props.angsuran).format('0,0')}
            </FormItemText>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

PerhitunganAngsuran.propTypes = {
  intl: PropTypes.object,
  gaji: PropTypes.number,
  plafon: PropTypes.number,
  tenor: PropTypes.number,
  margin: PropTypes.number,
  angsuran: PropTypes.number,
  parameter: PropTypes.object,
  stepProgress: PropTypes.number,
  changeGaji: PropTypes.func,
  changePlafon: PropTypes.func,
  changeTenor: PropTypes.func,
  changeAngsuran: PropTypes.func,
  getParam: PropTypes.func,
  // setSimulasiTour: PropTypes.func,
  changeNmargin: PropTypes.func,
  changeRateAss: PropTypes.func,
  changeByaadm: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  gaji: makeSelectGaji(),
  plafon: makeSelectPlafon(),
  tenor: makeSelectTenor(),
  margin: makeSelectMargin(),
  angsuran: makeSelectAngsuran(),
  parameter: makeSelectParameter(),
  stepProgress: makeSelectStepProgress(),
});

function mapDispatchToProps(dispatch) {
  return {
    changeGaji: value => dispatch(changeGajiAction(value)),
    changePlafon: value => dispatch(changePlafonAction(value)),
    changeTenor: value => dispatch(changeTenorAction(value)),
    changeAngsuran: value => dispatch(changeAngsuranAction(value)),
    getParam: idprod => dispatch(getParamAction(idprod)),
    setSimulasiTour: (open, count) =>
      dispatch(setSimulasiTourAction(open, count)),
    changeNmargin: nmargin => dispatch(changeNmarginAction(nmargin)),
    changeRateAss: ratass => dispatch(changeRateAssAction(ratass)),
    changeByaadm: byaadm => dispatch(changeByaadmAction(byaadm)),
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
)(PerhitunganAngsuran);
