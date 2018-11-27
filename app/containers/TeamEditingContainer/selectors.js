import { createSelector } from 'reselect';
import { initialState } from './reducer';
/**
 * Direct selector to the teamEditingContainer state domain
 */

const selectTeamEditingContainerDomain = state =>
  state.get('teamEditingContainer', initialState);

/**
 * Other specific selectors
 */

const makeSelectTeamContainerTeams = () =>
  createSelector(selectTeamEditingContainerDomain, mapState =>
    mapState.get('teams').toJS(),
  );

/**
 * Default selector used by TeamEditingContainer
 */

const makeSelectTeamEditingContainer = () =>
  createSelector(selectTeamEditingContainerDomain, substate => substate.toJS());

export default makeSelectTeamEditingContainer;
export { selectTeamEditingContainerDomain, makeSelectTeamContainerTeams };
