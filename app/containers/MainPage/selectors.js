import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the mainPage state domain
 */

const selectMainPageDomain = state => state.mainPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by MainPage
 */

const makeSelectMainPage = () =>
  createSelector(
    selectMainPageDomain,
    substate => substate,
  );

const makeSelectActiveStep = () =>
  createSelector(
    selectMainPageDomain,
    substate => substate.active_step,
  );

const makeSelectStatusAplikasi = () =>
  createSelector(
    selectMainPageDomain,
    substate => substate.status_aplikasi,
  );

const makeSelectAkad = () =>
  createSelector(
    selectMainPageDomain,
    substate => substate.dokumen.akad,
  );

export default makeSelectMainPage;
export { 
  selectMainPageDomain,
  makeSelectActiveStep,
  makeSelectStatusAplikasi,
  makeSelectAkad
};