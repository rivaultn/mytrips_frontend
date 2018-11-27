/*
 *
 * AddingModalPhotoEditingContainer reducer
 *
 */

import { fromJS } from 'immutable';
import {
  SET_CURRENT_EDITING_STEP,
  SET_CURRENT_INDEX_EDITING_ITEM,
} from './constants';

export const initialState = fromJS({
  currentEditingStep: 1,
  currentIndexEditingItem: 0,
});

function addingModalPhotoEditingContainerReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_INDEX_EDITING_ITEM:
      return state.set('currentIndexEditingItem', action.newIndex);
    case SET_CURRENT_EDITING_STEP:
      return state.set('currentEditingStep', action.newStep);
    default:
      return state;
  }
}

export default addingModalPhotoEditingContainerReducer;
