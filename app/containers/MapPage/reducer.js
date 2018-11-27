/*
 * HomeReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */
import { fromJS } from 'immutable';
import {
  CHANGE_TRIP,
  CHANGE_STEP,
  CHANGE_CURRENT_ITEM,
  CHANGE_ITEMS_TO_DISPLAY_ON_MAP,
  DISPLAY_GALLERY,
  DISPLAY_COMMENT,
  DISPLAY_TEAMS_POPOVER,
  RETURN_TO_TRIP,
  TOGGLE_DELETE_MODAL,
  SET_IS_OPEN_ERROR_MODAL,
  SET_SUCCESS_MESSAGE,
} from './constants';

export const initialState = fromJS({
  isListOfTrip: true,
  itemsToDisplayOnMap: [],
  displayGallery: false,
  displayComment: false,
  displayTeamsPopover: false,
  deleteModalIsOpen: false,
  isOpenErrorModal: false,
  currentTrip: false,
  currentStep: false,
  currentSubstep: false,
  currentItemIndex: false,
  currentItem: false,
  itemToDelete: false,
  success: false,
  successMessage: false,
});

function mapReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_TRIP:
      return state
        .set('error', false)
        .set('loading', false)
        .set('isListOfTrip', false)
        .set('currentTrip', action.item);
    case CHANGE_STEP:
      return state
        .set('error', false)
        .set('loading', false)
        .set('isListOfTrip', false)
        .set('currentStep', action.item)
        .set('currentItemIndex', 0)
        .set('currentItem', action.item.substeps[0]);

    case CHANGE_ITEMS_TO_DISPLAY_ON_MAP:
      return state
        .set('error', false)
        .set('loading', false)
        .set('itemsToDisplayOnMap', action.items);
    case RETURN_TO_TRIP:
      return state
        .set('error', false)
        .set('loading', true)
        .set('isListOfTrip', true)
        .set('itemsToDisplayOnMap', action.itemsToDisplayOnMap)
        .set('currentTrip', false)
        .set('currentStep', false)
        .set('currentItemIndex', false)
        .set('currentItem', false);
    case DISPLAY_GALLERY:
      return state.set('displayGallery', action.galleryDisplay);
    case DISPLAY_COMMENT:
      return state.set('displayComment', !state.get('displayComment'));
    case DISPLAY_TEAMS_POPOVER:
      return state.set(
        'displayTeamsPopover',
        !state.get('displayTeamsPopover'),
      );
    case CHANGE_CURRENT_ITEM:
      const newIndexItem =
        state.get('currentStep').substeps.length > action.newIndex
          ? action.newIndex
          : 0;
      return state
        .set('currentItemIndex', newIndexItem)
        .set('currentItem', state.get('currentStep').substeps[newIndexItem]);
    case TOGGLE_DELETE_MODAL:
      return state
        .set('deleteModalIsOpen', !state.get('deleteModalIsOpen'))
        .set('itemToDelete', action.itemToDelete);
    case SET_IS_OPEN_ERROR_MODAL:
      return state.set('isOpenErrorModal', action.isOpen);
    case SET_SUCCESS_MESSAGE:
      return state
        .set('success', action.success)
        .set('successMessage', action.successMessage);
    default:
      return state;
  }
}

export default mapReducer;
