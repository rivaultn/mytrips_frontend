import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectNavBar = state => state.get('navbar', initialState);

const makeSelectIsOpen = () =>
  createSelector(selectNavBar, navBarState => navBarState.get('isOpen'));

export { selectNavBar, makeSelectIsOpen };
