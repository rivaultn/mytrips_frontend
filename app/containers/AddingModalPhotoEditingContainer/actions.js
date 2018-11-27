/*
 *
 * AddingModalPhotoEditingContainer actions
 *
 */

import {
  SET_CURRENT_INDEX_EDITING_ITEM,
  SET_CURRENT_EDITING_STEP,
} from './constants';

/**
 * Set the index of the currently editing item
 *
 * @param newIndex {number}   the new index
 *
 * @return {object}    An action object with a type of SET_CURRENT_INDEX_EDITING_ITEM
 */
export function setCurrentIndexEditingItem(newIndex) {
  return {
    type: SET_CURRENT_INDEX_EDITING_ITEM,
    newIndex,
  };
}

/**
 * Set the current step
 *
 * @param newStep {number} {0 | 1}    the new step
 *
 * @return {object}    An action object with a type of SET_CURRENT_EDITING_STEP
 */
export function setCurrentEditingStep(newStep) {
  return {
    type: SET_CURRENT_EDITING_STEP,
    newStep,
  };
}
