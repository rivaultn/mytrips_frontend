/*
 *
 * TeamEditingContainer actions
 *
 */

import {
  ADD_NEW_TEAM,
  DELETE_TEAM,
  SET_TEAM_VALUE,
  SET_TEAMS,
} from './constants';

/**
 * Set teams to edit
 *
 * @param teams {array}   teams array to edit
 *
 * @return {object}    An action object with a type of SET_PHOTO_IN_ONE
 */
export function setTeams(teams) {
  return {
    type: SET_TEAMS,
    teams,
  };
}

/**
 * Edit team value
 *
 * @param index {number}    the step index to edit
 * @param field {string}    the property to edit
 * @param newValue {string}   the new value
 *
 * @return {object}    An action object with a type of SET_TEAM_VALUE
 */
export function setTeamValue(index, field, newValue) {
  return {
    type: SET_TEAM_VALUE,
    index,
    field,
    newValue,
  };
}

/**
 * Delete team
 *
 * @param index {number}    team index to delete
 *
 * @return {object}    An action object with a type of DELETE_TEAM
 */
export function deleteTeam(index) {
  return {
    type: DELETE_TEAM,
    index,
  };
}

/**
 * Add a new team
 *
 * @return {object}    An action object with a type of ADD_NEW_TEAM
 */
export function addNewTeam() {
  return {
    type: ADD_NEW_TEAM,
  };
}
