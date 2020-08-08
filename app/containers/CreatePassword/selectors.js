import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectCreatePasswordDomain = state =>
  state.createPassword || initialState;

const makeSelectCreatePassword = () =>
  createSelector(
    selectCreatePasswordDomain,
    substate => substate,
  );

const makeSelectPassword = () =>
  createSelector(
    selectCreatePasswordDomain,
    substate => substate.password,
  );

const makeSelectPasswordConfirm = () =>
  createSelector(
    selectCreatePasswordDomain,
    substate => substate.password_confirm,
  );

const makeSelectError = () =>
  createSelector(
    selectCreatePasswordDomain,
    substate => substate.error.message,
  );

const makeSelectSuccess = () =>
  createSelector(
    selectCreatePasswordDomain,
    substate => substate.success.message,
  );

const makeSelectIsLoading = () => createSelector(selectCreatePasswordDomain, substate => substate.isLoading);

export default makeSelectCreatePassword;
export { 
  selectCreatePasswordDomain,
  makeSelectPassword,
  makeSelectPasswordConfirm,
  makeSelectError,
  makeSelectSuccess,
  makeSelectIsLoading
};
