import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectUserRegistrationDomain = state =>
  state.userRegistration || initialState;

const makeSelectUserRegistration = () =>
  createSelector(
    selectUserRegistrationDomain,
    substate => substate,
  );


const makeSelectUser = () => createSelector(selectUserRegistrationDomain, substate => substate.user);
const makeSelectError = () => createSelector(selectUserRegistrationDomain, substate => substate.error);
const makeSelectSuccess = () => createSelector(selectUserRegistrationDomain, substate => substate.success);
const makeSelectKodeAktifasi = () => createSelector(selectUserRegistrationDomain, substate => substate.kode_aktifasi);
export default makeSelectUserRegistration;
export { selectUserRegistrationDomain, makeSelectUser, makeSelectError, makeSelectSuccess, makeSelectKodeAktifasi };
