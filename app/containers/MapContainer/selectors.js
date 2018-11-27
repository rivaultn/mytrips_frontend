import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the tripListItem state domain
 */

const selectMapContainerDomain = state =>
  state.get('mapContainer', initialState);

const makeSelectMapContainer = () =>
  createSelector(selectMapContainerDomain, substate => substate.toJS());

export default makeSelectMapContainer;
export { selectMapContainerDomain };
