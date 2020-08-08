/*
 *
 * Dashboard actions
 *
 */

import { DEFAULT_ACTION, TOGGLE_TOUR, TOGGLE_TOUR_DIALOG_START } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export const toggleTour = (tourState) => ({
  type: TOGGLE_TOUR,
  payload: tourState
});

export const toggleTourDialogStart = (dialogState) => ({
  type: TOGGLE_TOUR_DIALOG_START,
  payload: dialogState
})


