/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';

const selectMapPage = state => state.get('map');

const makeSelectCurrentTrip = () =>
  createSelector(selectMapPage, mapState => mapState.get('currentTrip'));

const makeSelectCurrentStep = () =>
  createSelector(selectMapPage, mapState => mapState.get('currentStep'));

const makeSelectIsListOfTrip = () =>
  createSelector(selectMapPage, mapState => mapState.get('isListOfTrip'));

const makeSelectDisplayGallery = () =>
  createSelector(selectMapPage, mapState => mapState.get('displayGallery'));

const makeSelectDisplayComment = () =>
  createSelector(selectMapPage, mapState => mapState.get('displayComment'));

const makeSelectDeleteModalIsOpen = () =>
  createSelector(selectMapPage, mapState => mapState.get('deleteModalIsOpen'));

const makeSelectItemToDelete = () =>
  createSelector(selectMapPage, mapState => mapState.get('itemToDelete'));

const makeSelectOpenModalError = () =>
  createSelector(selectMapPage, mapState => mapState.get('isOpenErrorModal'));

const makeSelectSuccess = () =>
  createSelector(selectMapPage, mapState => mapState.get('success'));

const makeSelectSuccessMessage = () =>
  createSelector(selectMapPage, mapState => mapState.get('successMessage'));

const makeSelectDisplayTeamsPopover = () =>
  createSelector(selectMapPage, mapState =>
    mapState.get('displayTeamsPopover'),
  );

const makeSelectCurrentItemMapPage = () =>
  createSelector(selectMapPage, mapState => mapState.get('currentItem'));

const makeSelectItemsToDisplayOnMap = () =>
  createSelector(selectMapPage, mapState =>
    mapState.get('itemsToDisplayOnMap'),
  );

export {
  selectMapPage,
  makeSelectCurrentTrip,
  makeSelectCurrentStep,
  makeSelectIsListOfTrip,
  makeSelectItemsToDisplayOnMap,
  makeSelectDisplayTeamsPopover,
  makeSelectDisplayGallery,
  makeSelectDisplayComment,
  makeSelectDeleteModalIsOpen,
  makeSelectItemToDelete,
  makeSelectOpenModalError,
  makeSelectSuccess,
  makeSelectSuccessMessage,
  makeSelectCurrentItemMapPage,
};
