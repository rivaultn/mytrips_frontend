import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectSideBar = state => state.get('sidebar', initialState);

const makeSelectIsOpen = () =>
  createSelector(selectSideBar, sideBarState => sideBarState.get('isOpen'));

export { selectSideBar, makeSelectIsOpen};
