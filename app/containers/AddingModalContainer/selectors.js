import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the addingModalContainer state domain
 */

const selectAddingModalComponentDomain = state =>
  state.get('addingModalComponent', initialState);

/**
 * Other specific selectors
 */

const makeSelectIsOpen = () =>
  createSelector(selectAddingModalComponentDomain, addingModalState =>
    addingModalState.get('isOpen'),
  );

const makeSelectAdd = () =>
  createSelector(selectAddingModalComponentDomain, addingModalState =>
    addingModalState.get('add'),
  );

const makeSelectCurrentStep = () =>
  createSelector(selectAddingModalComponentDomain, addingModalState =>
    addingModalState.get('currentStep'),
  );

const makeSelectCurrentItem = () =>
  createSelector(selectAddingModalComponentDomain, addingModalState =>
    addingModalState.get('currentEditingItem').toJS(),
  );

/**
 * Default selector used by AddingModalComponent
 */

const makeSelectAddingModalComponent = () =>
  createSelector(selectAddingModalComponentDomain, substate => substate.toJS());

export default makeSelectAddingModalComponent;
export {
  selectAddingModalComponentDomain,
  makeSelectIsOpen,
  makeSelectAdd,
  makeSelectCurrentStep,
  makeSelectCurrentItem,
};
