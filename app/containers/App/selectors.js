import { createSelector } from 'reselect';

const selectGlobal = state => state.get('global');

const selectRoute = state => state.get('route');

const makeSelectLoading = () =>
  createSelector(selectGlobal, globalState => globalState.get('loading'));

const makeSelectError = () =>
  createSelector(selectGlobal, globalState => globalState.get('error'));

const makeSelectTrips = () =>
  createSelector(selectGlobal, globalState => globalState.get('trips'));

const makeSelectTeams = () =>
  createSelector(selectGlobal, globalState => globalState.get('teams'));

const makeSelectLocation = () =>
  createSelector(selectRoute, routeState => routeState.get('location').toJS());

export {
  selectGlobal,
  makeSelectLoading,
  makeSelectError,
  makeSelectTrips,
  makeSelectLocation,
  makeSelectTeams,
};
