/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const LOAD_TRIPS = 'mytrips/App/LOAD_TRIPS';
export const LOAD_TRIPS_SUCCESS = 'mytrips/App/LOAD_TRIPS_SUCCESS';
export const LOAD_TRIPS_ERROR = 'mytrips/App/LOAD_TRIPS_ERROR';
export const LOAD_TEAMS = 'mytrips/App/LOAD_TEAMS';
export const LOAD_TEAMS_SUCCESS = 'mytrips/App/LOAD_TEAMS_SUCCESS';
export const LOAD_TEAMS_ERROR = 'mytrips/App/LOAD_TEAMS_ERROR';
