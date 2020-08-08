/*
 *
 * Dashboard reducer
 *
 */
import produce from 'immer';
import { DEFAULT_ACTION,TOGGLE_TOUR, TOGGLE_TOUR_DIALOG_START } from './constants';

export const initialState = {
  isTourOpen:false,
  isTourDialogStart:false,
};

/* eslint-disable default-case, no-param-reassign */
const dashboardReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case TOGGLE_TOUR:
        draft.isTourOpen = action.payload;
        return draft;
      case TOGGLE_TOUR_DIALOG_START:
        draft.isTourDialogStart = action.payload;
        return draft;
    }
  });

export default dashboardReducer;
