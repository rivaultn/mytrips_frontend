import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the tripListItem state domain
 */

const selectTripListItemDomain = state =>
  state.get('tripListItem', initialState);

const makeSelectTripListItem = () =>
  createSelector(selectTripListItemDomain, substate => substate.toJS());

export default makeSelectTripListItem;

export { selectTripListItemDomain };
