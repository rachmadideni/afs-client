/**
 *
 * FormPekerjaan
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import styled from 'styled-components';
import validate from 'validate.js';

import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import {
  changeCompanyAction,
  // changeCompanyJoinDateAction,
  changeWorkingYearsAction,
  getOpsiSbuAction,
} from './actions';
import messages from './messages';
import {
  makeSelectWorkData,
  makeSelectSbu,
} from '../FormSubmissionStep/selectors';

// import { WORKING_YEARS_OPTIONS } from './constants';

const Wrapper = styled(props => <Grid {...props} />)`
  && {
    background-color: transparent;
    padding-left: 0px;
    padding-right: 0px;
    padding-top: 10px;
  }
`;

class FormPekerjaan extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: {
        company: null,
        companyJoinDate: null,
        workingYears: null,
      },
    };

    this.validateInput = this.validateInput.bind(this);
  }

  componentDidMount() {
    this.props.getOpsiSbu();
  }

  validateInput(inputValue, inputName) {
    const { intl } = this.props;
    let isError = false;
    let errorMessage = null;
    if (validate.isEmpty(inputValue)) {
      isError = true;

      switch (inputName) {
        case 'company':
          errorMessage = intl.formatMessage(messages.emptyCompany);
          break;
        case 'companyJoinDate':
          errorMessage = intl.formatMessage(messages.emptyCompanyJoinDate);
          break;
        default:
          errorMessage = null;
          break;
      }
    }

    this.setState(state => ({
      ...state,
      error: {
        ...state.error,
        [inputName]: errorMessage,
      },
    }));
    return !isError;
  }

  checkJenisProduk = companyId => {
    const { opsiSbu, changeCompany } = this.props;
    const f = opsiSbu.filter(item => item.IDSBU === companyId);
    if (f) {
      const jenisProduk = f[0].QARDH === 1 ? 3 : 2;
      return changeCompany(companyId, jenisProduk);
    }
    return false;
  };

  render() {
    const {
      intl,
      work,
      // changeCompanyJoinDate,
      changeWorkingYears,
      opsiSbu,
    } = this.props;
    return (
      <Wrapper
        container
        wrap="nowrap"
        direction="column"
        alignItems="center"
        style={{
          backgroundColor: 'transparent',
        }}
      >
        <Grid item style={{ width: '100%' }}>
          <form autoComplete="off">
            <FormControl variant="outlined" margin="dense" fullWidth>
              <InputLabel color="secondary" shrink>
                {intl.formatMessage(messages.company)}
              </InputLabel>
              <Select
                id="company"
                name="company"
                value={work.company}
                fullWidth
                onChange={evt => {
                  this.checkJenisProduk(evt.target.value);
                }}
                error={!!this.state.error.company}
                helpertext={this.state.error.company}
                variant="outlined"
                margin="dense"
                color="secondary"
                labelWidth={110}
                style={{
                  textTransform: 'lowercase',
                }}
              >
                {opsiSbu.map(sbu => (
                  <MenuItem
                    key={`${sbu.title}-${sbu.IDSBU}`}
                    value={sbu.IDSBU}
                    style={{
                      textTransform: 'lowercase',
                    }}
                  >
                    {sbu.NMSBU}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* <FormControl variant="outlined" margin="dense" fullWidth>
              <TextField
                id="companyJoinDate"
                name="companyJoinDate"
                type="date"
                value={work.companyJoinDate}
                onChange={evt => changeCompanyJoinDate(evt.target.value)}
                fullWidth
                color="secondary"
                InputLabelProps={{ shrink: true }}
                label={intl.formatMessage(messages.companyJoinDate)}
                labelwidth={110}
                variant="outlined"
                margin="dense"
              />
            </FormControl> */}

            {/* pake input tahun bekerja */}
            <TextField
              id="lamaBekerja"
              name="lamaBekerja"
              label="lama tahun bekerja"
              InputLabelProps={{ shrink: true }}
              type="text"
              value={work.workingYears}
              inputProps={{ min: '-99', max: '99', maxLength: 2 }}
              onChange={evt => changeWorkingYears(evt.target.value)}
              fullWidth
              color="secondary"
              variant="outlined"
              margin="dense"
            />

            {/* pake opsi */}
            {/* <FormControl variant="outlined" margin="dense" fullWidth>
              <InputLabel color="secondary" shrink>
                {"lama bekerja"}
              </InputLabel>
              <Select
                id="opsi_lama_kerja"
                name="opsi_lama_kerja"
                value={work.workingYears}
                fullWidth
                onChange={evt => { this.checkJenisProduk(evt.target.value); }}
                error={!!this.state.error.company}
                helpertext={this.state.error.company}
                variant="outlined"
                margin="dense"
                color="secondary"
                labelWidth={110}
                style={{
                  textTransform: 'Capitalize',
                }}>
                {WORKING_YEARS_OPTIONS.map(item => (
                  <MenuItem
                    key={`${item.id}`}
                    value={item.id}
                    style={{ textTransform: 'Capitalize' }}>
                    {item.ketera}
                  </MenuItem>
                ))}
              </Select>
            </FormControl> */}
          </form>
        </Grid>
      </Wrapper>
    );
  }
}

FormPekerjaan.propTypes = {
  intl: PropTypes.object,
  work: PropTypes.object,
  opsiSbu: PropTypes.array,
  getOpsiSbu: PropTypes.func,
  changeCompany: PropTypes.func,
  // changeCompanyJoinDate: PropTypes.func,
  changeWorkingYears: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  work: makeSelectWorkData(),
  opsiSbu: makeSelectSbu(),
});

function mapDispatchToProps(dispatch) {
  return {
    changeCompany: (company, jenisProduk) =>
      dispatch(changeCompanyAction(company, jenisProduk)),
    // changeCompanyJoinDate: value =>
    //   dispatch(changeCompanyJoinDateAction(value)),
    changeWorkingYears: years => dispatch(changeWorkingYearsAction(years)),
    getOpsiSbu: () => dispatch(getOpsiSbuAction()),
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
)(FormPekerjaan);
