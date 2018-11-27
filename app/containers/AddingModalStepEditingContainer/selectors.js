import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the addingModalStepEditingContainer state domain
 */

const selectAddingModalStepEditingContainerDomain = state =>
  state.get('addingModalStepEditingContainer', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by AddingModalStepEditingContainer
 */

const makeSelectAddingModalStepEditingContainer = () =>
  createSelector(selectAddingModalStepEditingContainerDomain, substate =>
    substate.toJS(),
  );

export default makeSelectAddingModalStepEditingContainer;
export { selectAddingModalStepEditingContainerDomain };
