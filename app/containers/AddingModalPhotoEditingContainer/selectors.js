import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the addingModalPhotoEditingContainer state domain
 */

const selectAddingModalPhotoEditingContainerDomain = state =>
  state.get('addingModalPhotoEditingContainer', initialState);

/**
 * Other specific selectors
 */

const makeSelectCurrentEditingStep = () =>
  createSelector(
    selectAddingModalPhotoEditingContainerDomain,
    photoModalState => photoModalState.get('currentEditingStep'),
  );

const makeSelectCurrentIndexEditingItem = () =>
  createSelector(
    selectAddingModalPhotoEditingContainerDomain,
    photoModalState => photoModalState.get('currentIndexEditingItem'),
  );

/**
 * Default selector used by AddingModalPhotoEditingContainer
 */

const makeSelectAddingModalPhotoEditingContainer = () =>
  createSelector(selectAddingModalPhotoEditingContainerDomain, substate =>
    substate.toJS(),
  );

export default makeSelectAddingModalPhotoEditingContainer;
export {
  selectAddingModalPhotoEditingContainerDomain,
  makeSelectCurrentEditingStep,
  makeSelectCurrentIndexEditingItem,
};
