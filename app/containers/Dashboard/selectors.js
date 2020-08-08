import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectDashboardDomain = state => state.dashboard || initialState;
const makeSelectDashboard = () =>
  createSelector(
    selectDashboardDomain,
    substate => substate,
  );

const makeSelectTourState = () => createSelector(selectDashboardDomain, substate => substate.isTourOpen);
const makeSelectTourDialogStart = () => createSelector(selectDashboardDomain, substate => substate.isTourDialogStart);
export default makeSelectDashboard;
export { selectDashboardDomain, makeSelectTourState, makeSelectTourDialogStart };
