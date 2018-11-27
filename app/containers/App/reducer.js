/*
 * AppReducer
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
  LOAD_TRIPS_SUCCESS,
  LOAD_TRIPS,
  LOAD_TRIPS_ERROR,
  LOAD_TEAMS,
  LOAD_TEAMS_SUCCESS,
  LOAD_TEAMS_ERROR,
} from './constants';

// The initial state of the App
const initialState = fromJS({
  loading: false,
  error: false,
  trips: false,
  teams: false,
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_TRIPS:
      return state
        .set('loading', true)
        .set('error', false)
        .set('trips', false)
        .set('isListOfTrip', true);
    case LOAD_TRIPS_SUCCESS:
      return state
        .set('trips', action.trips)
        .set('loading', false)
        .set('error', false)
        .set('isListOfTrip', true);
    case LOAD_TRIPS_ERROR:
      return state
        .set('error', action.error)
        .set('loading', false)
        .set('isListOfTrip', true);
    case LOAD_TEAMS:
      return state
        .set('loading', true)
        .set('error', false)
        .set('teams', false);
    case LOAD_TEAMS_SUCCESS:
      return state
        .set('teams', action.teams)
        .set('loading', false)
        .set('error', false);
    case LOAD_TEAMS_ERROR:
      return state.set('error', action.error).set('loading', false);
    default:
      return state;
  }
}

export default appReducer;
