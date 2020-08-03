import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectVerifyConfirmPageDomain = state => state.verifyConfirmPage || initialState;

const makeSelectVerifyConfirmPage = () =>
  createSelector(
    selectVerifyConfirmPageDomain,
    substate => substate,
  );

const makeSelectKodeAktifasi = () => createSelector(selectVerifyConfirmPageDomain,
  substate => substate.fromUser_activation_code)

const makeSelectKodeFromServer = () => createSelector(selectVerifyConfirmPageDomain,
  substate => substate.fromServer_activation_code)

const makeSelectError = () => createSelector(selectVerifyConfirmPageDomain,
  substate => substate.error.message)

const makeSelectSuccess = () => createSelector(selectVerifyConfirmPageDomain,
  substate => substate.confirm.successMessage)

export default makeSelectVerifyConfirmPage;
export { 
  selectVerifyConfirmPageDomain,
  makeSelectKodeAktifasi,
  makeSelectKodeFromServer,
  makeSelectError,
  makeSelectSuccess
};
