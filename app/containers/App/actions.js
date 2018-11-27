/*
 * App Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import {
  LOAD_TRIPS,
  LOAD_TRIPS_SUCCESS,
  LOAD_TRIPS_ERROR,
  LOAD_TEAMS,
  LOAD_TEAMS_SUCCESS,
  LOAD_TEAMS_ERROR,
} from './constants';

/**
 * Load the trips, this action starts the request saga
 *
 * @return {object} An action object with a type of LOAD_TRIPS
 */
export function loadTrips() {
  return {
    type: LOAD_TRIPS,
  };
}

/**
 * Dispatched when the trips are loaded by the request saga
 *
 * @param  {array} trips The trips data
 *
 * @return {object}      An action object with a type of LOAD_REPOS_SUCCESS passing the trips
 */
export function tripsLoaded(trips) {
  return {
    type: LOAD_TRIPS_SUCCESS,
    trips,
  };
}

/**
 * Dispatched when loading the trips fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of LOAD_TRIPS_ERROR passing the error
 */
export function tripLoadingError(error) {
  return {
    type: LOAD_TRIPS_ERROR,
    error,
  };
}

/**
 * Load the trips, this action starts the request saga
 *
 * @return {object} An action object with a type of LOAD_TRIPS
 */
export function loadTeams() {
  return {
    type: LOAD_TEAMS,
  };
}

/**
 * Dispatched when the trips are loaded by the request saga
 *
 * @param  {array} trips The trips data
 *
 * @return {object}      An action object with a type of LOAD_REPOS_SUCCESS passing the trips
 */
export function teamsLoaded(teams) {
  return {
    type: LOAD_TEAMS_SUCCESS,
    teams,
  };
}

/**
 * Dispatched when loading the trips fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of LOAD_TRIPS_ERROR passing the error
 */
export function teamsLoadingError(error) {
  return {
    type: LOAD_TEAMS_ERROR,
    error,
  };
}
