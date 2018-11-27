import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the substepEditingContainer state domain
 */

const selectSubstepEditingContainerDomain = state =>
  state.get('substepEditingContainer', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by SubstepEditingContainer
 */

const makeSelectSubstepEditingContainer = () =>
  createSelector(selectSubstepEditingContainerDomain, substate =>
    substate.toJS(),
  );

export default makeSelectSubstepEditingContainer;
export { selectSubstepEditingContainerDomain };
