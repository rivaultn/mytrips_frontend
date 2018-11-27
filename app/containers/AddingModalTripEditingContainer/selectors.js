import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the addingModalTripEditingContainer state domain
 */

const selectAddingModalTripEditingContainerDomain = state =>
  state.get('addingModalTripEditingContainer', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by AddingModalTripEditingContainer
 */

const makeSelectAddingModalTripEditingContainer = () =>
  createSelector(selectAddingModalTripEditingContainerDomain, substate =>
    substate.toJS(),
  );

export default makeSelectAddingModalTripEditingContainer;
export { selectAddingModalTripEditingContainerDomain };
