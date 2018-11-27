import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the galleryContainer state domain
 */

const selectGalleryContainerDomain = state =>
  state.get('galleryContainer', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by GalleryContainer
 */

const makeSelectGalleryContainer = () =>
  createSelector(selectGalleryContainerDomain, substate => substate.toJS());

export default makeSelectGalleryContainer;
export { selectGalleryContainerDomain };
