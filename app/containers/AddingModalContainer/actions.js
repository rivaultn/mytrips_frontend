/*
 *
 * AddingModalComponent actions
 *
 */

import {
  TOGGLE_ADDING_MODAL,
  ADD_NEW_STEP,
  ADD_TRANSPORT,
  REMOVE_TRANSPORT,
  EDIT_TRANSPORT,
  ADD_SUBSTEP,
  DELETE_SUBSTEP,
  EDIT_SUBSTEP,
  EDIT_STEP,
  CHANGE_LOCATION,
  TRIP_SAVED,
  CREATE_OR_UPDATE_TRIP,
  CHANGE_CURRENT_STEP,
  EDIT_ADD,
  EDIT_TRIP_INFO,
  SET_ORIGINAL_ITEM,
  RESET_STEP,
  REMOVE_STEP,
  SET_SUBSTEP,
} from './constants';

/**
 * Toggle the adding modal
 *
 * @param add {boolean}   true if it's a new item to add
 * @param item {object}   the item to add / edit
 *
 * @return {object}    An action object with a type of TOGGLE_ADDING_MODAL
 */
export function toggleModal(add, item) {
  return {
    type: TOGGLE_ADDING_MODAL,
    add,
    item,
  };
}

/**
 * Save a trip, calls the saga request
 *
 * @param tripToSave {object}   the trip to save
 * @param newTrip {boolean}   true if it's a new trip
 * @param nextStep {number}   step to display if save succeeded
 *
 * @return {object}    An action object with a type of CREATE_OR_UPDATE_TRIP
 */
export function createOrUpdateTrip(tripToSave, newTrip, nextStep) {
  return {
    type: CREATE_OR_UPDATE_TRIP,
    tripToSave,
    newTrip,
    nextStep,
  };
}

/**
 * Dispatched when the trip is saved
 *
 * @param trip {object} the trip
 *
 * @return {object}    An action object with a type of TRIP_SAVED
 */
export function tripSaved(trip) {
  return {
    type: TRIP_SAVED,
    trip,
  };
}

/**
 * Set the property add
 *
 * @param add {boolean}   true if it's a new trip
 *
 * @return {object}    An action object with a type of EDIT_ADD
 */
export function editAdd(add) {
  return {
    type: EDIT_ADD,
    add,
  };
}

/**
 * Reset changes on the current item
 *
 * @return {object}    An action object with a type of RESET_STEP
 */
export function resetStep() {
  return {
    type: RESET_STEP,
  };
}

/**
 * Set the original item, uses as reference to reset
 *
 * @param item {object}   the new original item
 *
 * @return {object}    An action object with a type of SET_ORIGINAL_ITEM
 */
export function setOriginalItem(item) {
  return {
    type: SET_ORIGINAL_ITEM,
    item,
  };
}

/**
 * Change the current adding / editing step
 *
 * @param newStep {number} {1|2|3|4} the new step
 *
 * @return {object}    An action object with a type of CHANGE_CURRENT_STEP
 */
export function changeCurrentStepAddModal(newStep) {
  return {
    type: CHANGE_CURRENT_STEP,
    newStep,
  };
}

/**
 * Add a new step to a trip
 *
 * @return {object}    An action object with a type of ADD_NEW_STEP
 */
export function addNewStep() {
  return {
    type: ADD_NEW_STEP,
  };
}

/**
 * Edit a step
 *
 * @param index {number}  the index of the step
 * @param field {string}  the property to edit
 * @param newValue {string}   the new value
 *
 * @return {object}    An action object with a type of EDIT_STEP
 */
export function editStep(index, field, newValue) {
  return {
    type: EDIT_STEP,
    index,
    field,
    newValue,
  };
}

/**
 * Edit a trip information
 *
 * @param field {string}  the property to edit
 * @param newValue {string}   the new value
 * @return {object}    An action object with a type of EDIT_TRIP_INFO
 */
export function editInfoTrip(field, newValue) {
  return {
    type: EDIT_TRIP_INFO,
    field,
    newValue,
  };
}

/**
 * Add a transport to the step
 *
 * @param index {number}    the step index
 * @param transport {string}    the string transport type
 *
 * @return {object}    An action object with a type of ADD_TRANSPORT
 */
export function addTransport(index, transport) {
  return {
    type: ADD_TRANSPORT,
    index,
    transport,
  };
}

/**
 * Remove a transport from a step
 *
 * @param index {number}    the step index
 * @param transport {string}    the transport type to remove
 *
 * @return {object}    An action object with a type of REMOVE_TRANSPORT
 */
export function removeTransport(index, transport) {
  return {
    type: REMOVE_TRANSPORT,
    index,
    transport,
  };
}

/**
 * Remove a step from a trip
 *
 * @param index {number}   the step index to remove
 *
 * @return {object}    An action object with a type of REMOVE_STEP
 */
export function removeStep(index) {
  return {
    type: REMOVE_STEP,
    index,
  };
}

/**
 * Edit transport informations
 *
 * @param index {number}  the step index
 * @param transport {string}  the transport type to edit
 * @param comment {string}    the new transport comment
 *
 * @return {object}    An action object with a type of EDIT_TRANSPORT
 */
export function editTransport(index, transport, comment) {
  return {
    type: EDIT_TRANSPORT,
    index,
    transport,
    comment,
  };
}

/**
 * Add a new substep to a step, this action call a saga request
 *
 * @param numStep {index}   the step index
 * @param name {string}   the substep name
 * @param nameMin {string}    the substep miniature name
 * @param uuid {string}     the substep uuid
 * @param date {date}   the substep date
 * @param long {string}   the substep longitude
 * @param lat {string}    the substep latitude
 *
 * @return {object}    An action object with a type of ADD_SUBSTEP
 */
export function addSubstep(numStep, name, nameMin, uuid, date, long, lat) {
  return {
    type: ADD_SUBSTEP,
    numStep,
    name,
    nameMin,
    uuid,
    date,
    long,
    lat,
  };
}

/**
 * Set the substep with exif data if exists, this action is called by a saga request
 *
 * @param numStep {index}   the step index
 * @param name {string}   the substep name
 * @param nameMin {string}    the substep miniature name
 * @param uuid {string}     the substep uuid
 * @param date {date}   the substep date
 * @param long {string}   the substep longitude
 * @param lat {string}    the substep latitude
 * @param place {string}  the substep place
 *
 * @return {object}    An action object with a type of SET_SUBSTEP
 */
export function setSubstep(
  numStep,
  name,
  nameMin,
  uuid,
  date,
  long,
  lat,
  place,
) {
  return {
    type: SET_SUBSTEP,
    numStep,
    name,
    nameMin,
    uuid,
    date,
    long,
    lat,
    place,
  };
}

/**
 * Delete a substep
 *
 * @param numStep {number}    the substep index
 * @param uuid {string}     the substep uuid
 *
 * @return {object}    An action object with a type of DELETE_SUBSTEP
 */
export function deleteSubstep(numStep, uuid) {
  return {
    type: DELETE_SUBSTEP,
    numStep,
    uuid,
  };
}

/**
 * Edit a substep
 *
 * @param numStep {number}    the substep index
 * @param uuid {string}     the substep uuid
 * @param field {string}    the substep property to edit
 * @param newValue {string}     the new value
 *
 * @return {object}    An action object with a type of EDIT_SUBSTEP
 */
export function editSubstep(numStep, uuid, field, newValue) {
  return {
    type: EDIT_SUBSTEP,
    numStep,
    uuid,
    field,
    newValue,
  };
}

/**
 * Change the substep location
 *
 * @param numStep {number}    the substep index
 * @param uuid {string}     the substep uuid
 * @param address {string}    the substep address
 * @param latLng {object}   object containing latitude and longitude
 *
 * @return {object}    An action object with a type of CHANGE_LOCATION
 */
export function changeLocation(numStep, uuid, address, latLng) {
  return {
    type: CHANGE_LOCATION,
    numStep,
    uuid,
    address,
    latLng,
  };
}
