/**
 *
 * FormNasabah
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

// import { setNasabahAction } from 'containers/FormSubmissionStep/actions';
import {
  changeFullnameAction,
  changeBirthplaceAction,
  changeBirthdateAction,
  changeAddressAction,
  changeGenderAction,
  validateInputAction,
  changeTriggeredAction,
  getOpsiJenkelAction,
  changeMotherMaidenNameAction,
} from 'containers/FormNasabah/actions';

import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
// import Button from '@material-ui/core/Button';

import validate from 'validate.js';
import { JENKEL } from './constants';
import messages from './messages';
import {
  makeSelectFullname,
  makeSelectBirthplace,
  makeSelectBirthdate,
  makeSelectAddress,
  makeSelectGender,
  makeSelectErrorFullname,
  makeSelectErrorBirthplace,
  makeSelectErrorBirthdate,
  makeSelectErrorAddress,
  makeSelectErrorGender,
  makeSelectErrorMotherMaidenName,
  makeSelectTriggered,
  makeSelectJenkel,
  makeSelectMotherMaidenName,
} from '../FormSubmissionStep/selectors';
import makeSelectFormNasabah from './selectors';

const Wrapper = styled(props => <Grid {...props} />)`
  && {
    background-color: transparent;
    padding-left: 0px;
    padding-right: 0px;
    padding-top: 10px;
  }
`;

class FormNasabah extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // fullname:'',
      // birthplace:'',
      // birthdate:'',
      // address:'',
      // gender:'',
      error: {
        fullname: null,
        birthplace: null,
        birthdate: null,
        address: null,
        gender: null,
      },
      // isSubmitTriggered: false,
    };
    this.onInputChange = this.onInputChange.bind(this);
  }

  componentDidMount() {
    this.props.getOpsiJenkel();
  }

  onInputChange(inputValue, inputName) {
    this.setState({
      [inputName]: inputValue,
    });
  }

  validateInput = (inputValue, inputName) => {
    const { intl } = this.props;
    let isError = false;
    let errorMessage = null;
    if (validate.isEmpty(inputValue)) {
      isError = true;
      switch (inputName) {
        case 'fullname':
          errorMessage = intl.formatMessage(messages.emptyFullname);
          break;
        case 'birthplace':
          errorMessage = intl.formatMessage(messages.emptyBirthplace);
          break;
        case 'birthdate':
          errorMessage = intl.formatMessage(messages.emptyBirthdate);
          break;
        case 'address':
          errorMessage = intl.formatMessage(messages.emptyAddress);
          break;
        case 'gender':
          errorMessage = intl.formatMessage(messages.emptyGender);
          break;
        default:
          errorMessage = null;
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
  };

  // handleSubmit = evt => {
  //   evt.preventDefault();
  //   const { fullname, birthplace, birthdate, address, gender } = this.state;

  //   this.setState(prevState => ({
  //     ...prevState,
  //     isSubmitTriggered: true,
  //   }));

  //   if (
  //     this.validateInput(fullname, 'fullname') &&
  //     this.validateInput(birthplace, 'birthplace') &&
  //     this.validateInput(birthdate, 'birthdate') &&
  //     this.validateInput(address, 'address') &&
  //     this.validateInput(gender, 'gender')
  //   ) {
  //     // TODO: CALL API TO SAVE DATA
  //     // console.log('the form is clean and is submitted to the server!');
  //      return this.props.setNasabah({
  //       fullname,
  //       birthplace,
  //       birthdate,
  //       address,
  //       gender,
  //     });
  //     // return true;
  //   }
  //   return false;
  // };

  // testValidasi = evt => {
  //   evt.preventDefault();
  //   this.props.changeTriggered(true);
  //   if (
  //     this.props.validateInput('fullname', this.props.fullname) &&
  //     this.props.validateInput('birthplace', this.props.birthplace) &&
  //     this.props.validateInput('birthdate', this.props.birthdate) &&
  //     this.props.validateInput('address', this.props.address) &&
  //     this.props.validateInput('gender', this.props.gender)
  //   ) {
  //   }

  //   return false;
  // };

  renderOpsiJenkel = () => {
    const { opsiJenkel } = this.props;
    const opsi = opsiJenkel.length > 0 ? opsiJenkel : JENKEL;
    return opsi.map(item => (
      <MenuItem
        key={`item-jenkel-${item.ID}`}
        value={item.ID}
        style={{ textTransform: 'lowercase' }}
      >
        {item.NAMKEL}
      </MenuItem>
    ));
  };

  render() {
    const {
      intl,
      changeFullname,
      changeBirthplace,
      changeBirthdate,
      changeAddress,
      changeGender,
      changeMotherMaidenName,
      isTriggered,
    } = this.props;

    return (
      <Wrapper container wrap="nowrap" direction="column" alignItems="center">
        <Grid item>
          <form autoComplete="off">
            <FormControl variant="outlined" margin="dense" fullWidth>
              <TextField
                id="nmlgkp"
                name="nmlgkp"
                color="secondary"
                fullWidth
                InputLabelProps={{ shrink: true }}
                variant="outlined"
                label={intl.formatMessage(messages.fullName)}
                margin="dense"
                value={this.props.fullname}
                onChange={evt => {
                  if (isTriggered) {
                    this.props.validateInput('fullname', this.props.fullname);
                  }
                  return changeFullname(evt.target.value);
                }}
                error={!!this.props.errorFullname}
                helperText={this.props.errorFullname}
              />
            </FormControl>
            <FormControl variant="outlined" margin="dense" fullWidth>
              <TextField
                id="tptlhr"
                name="tptlhr"
                fullWidth
                color="secondary"
                InputLabelProps={{ shrink: true }}
                variant="outlined"
                label={intl.formatMessage(messages.birthPlace)}
                margin="dense"
                value={this.props.birthplace}
                onChange={evt => {
                  if (isTriggered) {
                    this.props.validateInput(
                      'birthplace',
                      this.props.birthplace,
                    );
                  }
                  return changeBirthplace(evt.target.value);
                }}
                error={!!this.props.errorBirthplace}
                helperText={this.props.errorBirthplace}
              />
            </FormControl>
            <FormControl
              variant="outlined"
              margin="dense"
              fullWidth
              error={!!this.props.errorBirthdate}
            >
              <TextField
                id="tgllhr"
                name="tgllhr"
                type="date"
                fullWidth
                color="secondary"
                InputLabelProps={{ shrink: true }}
                label={intl.formatMessage(messages.birthDate)}
                labelwidth={110}
                variant="outlined"
                margin="dense"
                value={this.props.birthdate}
                onChange={evt => {
                  if (isTriggered) {
                    this.props.validateInput('birthdate', evt.target.value);
                  }
                  return changeBirthdate(evt.target.value);
                }}
                error={!!this.props.errorBirthdate}
                helperText={this.props.errorBirthdate}
              />
            </FormControl>
            <FormControl variant="outlined" fullWidth>
              <TextField
                id="alamt1"
                name="alamt1"
                fullWidth
                color="secondary"
                InputLabelProps={{ shrink: true }}
                variant="outlined"
                label={intl.formatMessage(messages.address)}
                margin="dense"
                value={this.props.address}
                onChange={evt => {
                  if (isTriggered) {
                    this.props.validateInput('address', this.props.address);
                  }
                  return changeAddress(evt.target.value);
                }}
                error={!!this.props.errorAddress}
                helperText={this.props.errorAddress}
              />
            </FormControl>
            <FormControl
              variant="outlined"
              margin="dense"
              fullWidth
              error={!!this.props.errorGender}
            >
              <InputLabel color="secondary" shrink>
                {intl.formatMessage(messages.gender)}
              </InputLabel>
              <Select
                id="jenkel"
                name="jenkel"
                variant="outlined"
                margin="dense"
                color="secondary"
                labelWidth={110}
                value={this.props.gender}
                displayEmpty
                onChange={evt => {
                  if (isTriggered) {
                    this.props.validateInput('gender', evt.target.value);
                  }
                  return changeGender(evt.target.value);
                }}
                error={!!this.props.errorGender}
                helpertext={this.props.errorGender}
                style={{
                  textTransform: 'lowercase',
                }}
              >
                {this.renderOpsiJenkel()}
              </Select>
              <FormHelperText>{this.props.errorGender}</FormHelperText>
            </FormControl>

            <FormControl variant="outlined" fullWidth>
              <TextField
                id="mother_maiden_name"
                name="mother_maiden_name"
                fullWidth
                color="secondary"
                InputLabelProps={{ shrink: true }}
                variant="outlined"
                label={intl.formatMessage(messages.motherMaidenName)}
                margin="dense"
                value={this.props.motherMaidenName}
                onChange={evt => {
                  if (isTriggered) {
                    this.props.validateInput(
                      'mother_maiden_name',
                      this.props.motherMaidenName,
                    );
                  }
                  return changeMotherMaidenName(evt.target.value);
                }}
                error={!!this.props.errorMotherMaidenName}
                helperText={this.props.errorMotherMaidenName}
              />
            </FormControl>
          </form>
        </Grid>
      </Wrapper>
    );
  }
}

FormNasabah.propTypes = {
  intl: PropTypes.object,
  fullname: PropTypes.string,
  birthplace: PropTypes.string,
  birthdate: PropTypes.string,
  address: PropTypes.string,
  gender: PropTypes.number,
  motherMaidenName: PropTypes.string,
  errorFullname: PropTypes.string,
  errorBirthplace: PropTypes.string,
  errorBirthdate: PropTypes.string,
  errorAddress: PropTypes.string,
  errorGender: PropTypes.string,
  errorMotherMaidenName: PropTypes.string,
  isTriggered: PropTypes.bool,
  opsiJenkel: PropTypes.array,
  changeFullname: PropTypes.func,
  changeBirthplace: PropTypes.func,
  changeBirthdate: PropTypes.func,
  changeAddress: PropTypes.func,
  changeGender: PropTypes.func,
  changeMotherMaidenName: PropTypes.func,
  validateInput: PropTypes.func,
  getOpsiJenkel: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  formNasabah: makeSelectFormNasabah(),
  fullname: makeSelectFullname(),
  birthplace: makeSelectBirthplace(),
  birthdate: makeSelectBirthdate(),
  address: makeSelectAddress(),
  gender: makeSelectGender(),
  motherMaidenName: makeSelectMotherMaidenName(),
  errorFullname: makeSelectErrorFullname(),
  errorBirthplace: makeSelectErrorBirthplace(),
  errorBirthdate: makeSelectErrorBirthdate(),
  errorAddress: makeSelectErrorAddress(),
  errorGender: makeSelectErrorGender(),
  errorMotherMaidenName: makeSelectErrorMotherMaidenName(),
  isTriggered: makeSelectTriggered(),
  opsiJenkel: makeSelectJenkel(),
});

function mapDispatchToProps(dispatch) {
  return {
    // dispatch,
    // setNasabah: data => dispatch(setNasabahAction(data)),
    changeFullname: value => dispatch(changeFullnameAction(value)),
    changeBirthplace: value => dispatch(changeBirthplaceAction(value)),
    changeBirthdate: value => dispatch(changeBirthdateAction(value)),
    changeAddress: value => dispatch(changeAddressAction(value)),
    changeGender: value => dispatch(changeGenderAction(value)),
    changeMotherMaidenName: value =>
      dispatch(changeMotherMaidenNameAction(value)),
    validateInput: (inputname, inputvalue) =>
      dispatch(validateInputAction(inputname, inputvalue)),
    changeTriggered: value => dispatch(changeTriggeredAction(value)),
    getOpsiJenkel: () => dispatch(getOpsiJenkelAction()),
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
)(FormNasabah);
