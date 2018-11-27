import {
  CHANGE_TRIP,
  CHANGE_STEP,
  CHANGE_CURRENT_ITEM,
  CHANGE_ITEMS_TO_DISPLAY_ON_MAP,
  DISPLAY_GALLERY,
  DISPLAY_COMMENT,
  RETURN_TO_TRIP,
  DISPLAY_TEAMS_POPOVER,
  TOGGLE_DELETE_MODAL,
  DELETE_TRIP_BY_ID,
  SET_IS_OPEN_ERROR_MODAL,
  SAVE_TEAMS,
  EDIT_AND_SAVE_SUBSTEP,
  EDIT_AND_SAVE_LOCATION,
  SET_PHOTO_IN_ONE,
  SET_SUCCESS_MESSAGE,
} from './constants';

/**
 * Change the active trip
 *
 * @param item {object}   the new trip
 *
 * @return {object}    An action object with a type of CHANGE_TRIP
 */
export function changeCurrentTrip(item) {
  return {
    type: CHANGE_TRIP,
    item,
  };
}

/**
 * Change the active step
 *
 * @param item {object}   the new step
 *
 * @return {object}    An action object with a type of CHANGE_STEP
 */
export function changeCurrentStep(item) {
  return {
    type: CHANGE_STEP,
    item,
  };
}

/**
 * Change the items to displays on the map
 *
 * @param items {array}   the array of objects to display on the map
 *
 * @return {object}    An action object with a type of CHANGE_ITEMS_TO_DISPLAY_ON_MAP
 */
export function changeItemsToDisplayOnMap(items) {
  return {
    type: CHANGE_ITEMS_TO_DISPLAY_ON_MAP,
    items,
  };
}

/**
 * Return to the trip list if a trip is active and sidebar is displaying steps
 *
 * @param itemsToDisplayOnMap {array}   the array of objects to display on the map
 *
 * @return {object}    An action object with a type of RETURN_TO_TRIP
 */
export function returnToTripList(itemsToDisplayOnMap) {
  return {
    type: RETURN_TO_TRIP,
    itemsToDisplayOnMap,
  };
}

/**
 * Display or hide photos gallery
 *
 * @param galleryDisplay {boolean}    true if photos gallery should be displayed
 *
 * @return {object}    An action object with a type of DISPLAY_GALLERY
 */
export function displayGallery(galleryDisplay) {
  return {
    type: DISPLAY_GALLERY,
    galleryDisplay,
  };
}

/**
 * Display or hide teams editing component
 *
 * @return {object}    An action object with a type of DISPLAY_TEAMS_POPOVER
 */
export function displayTeamsPopover() {
  return {
    type: DISPLAY_TEAMS_POPOVER,
  };
}

/**
 * Display or hide informations component on gallery container
 *
 * @return {object}    An action object with a type of DISPLAY_COMMENT
 */
export function displayComment() {
  return {
    type: DISPLAY_COMMENT,
  };
}

/**
 * Change the current active item
 *
 * @param newIndex {number}     the new active index
 *
 * @return {object}    An action object with a type of CHANGE_CURRENT_ITEM
 */
export function changeCurrentItem(newIndex) {
  return {
    type: CHANGE_CURRENT_ITEM,
    newIndex,
  };
}

/**
 * Display or hide confirmation delete modal
 *
 * @param itemToDelete {string}     the id item to delete
 *
 * @return {object}    An action object with a type of TOGGLE_DELETE_MODAL
 */
export function toggleDeleteModal(itemToDelete = false) {
  return {
    type: TOGGLE_DELETE_MODAL,
    itemToDelete,
  };
}

/**
 * Delete a trip, this action starts a saga request
 *
 * @return {object}    An action object with a type of DELETE_TRIP_BY_ID
 */
export function deleteTripById() {
  return {
    type: DELETE_TRIP_BY_ID,
  };
}

/**
 * Display or hide the error modal component
 *
 * @param isOpen {boolean}    true if modal should be displayed
 * @return {object}    An action object with a type of SET_IS_OPEN_ERROR_MODAL
 */
export function setOpenModalError(isOpen) {
  return {
    type: SET_IS_OPEN_ERROR_MODAL,
    isOpen,
  };
}

/**
 *  Save teams after editing, this action starts a saga request
 *
 * @param teams {array}     the teams array to save
 *
 * @return {object}    An action object with a type of SAVE_TEAMS
 */
export function saveTeams(teams) {
  return {
    type: SAVE_TEAMS,
    teams,
  };
}

/**
 * Edit a substep, this action starts a saga request
 *
 * @param field {string}    the property to edit
 * @param newValue {string}   the new value
 *
 * @return {object}    An action object with a type of EDIT_AND_SAVE_SUBSTEP
 */
export function editSubstep(field, newValue) {
  return {
    type: EDIT_AND_SAVE_SUBSTEP,
    field,
    newValue,
  };
}

/**
 * Set the photo in one of a trip, this action starts a saga request
 *
 * @param newPhotoInOne {string}    the path of the new photo in one
 *
 * @return {object}    An action object with a type of SET_PHOTO_IN_ONE
 */
export function setPhotoInOne(newPhotoInOne) {
  return {
    type: SET_PHOTO_IN_ONE,
    newPhotoInOne,
  };
}

/**
 * Set informations to display success alert
 *
 * @param successMessage {string}   the success message
 * @param success {boolean}   true if alert should be displayed
 *
 * @return {object}    An action object with a type of SET_SUCCESS_MESSAGE
 */
export function setSuccess(successMessage, success) {
  return {
    type: SET_SUCCESS_MESSAGE,
    successMessage,
    success,
  };
}

/**
 * Change a location substep, this action start a saga request
 *
 * @param address {string}    the new address
 * @param LatLng {object}     an object containing the latitude & the longitude
 * @return {object}    An action object with a type of EDIT_AND_SAVE_LOCATION
 */
export function editLocation(address, LatLng) {
  return {
    type: EDIT_AND_SAVE_LOCATION,
    address,
    LatLng,
  };
}
