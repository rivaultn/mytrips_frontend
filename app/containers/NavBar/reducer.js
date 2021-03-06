import { fromJS } from 'immutable';
import { TOGGLE } from './constants';

export const initialState = fromJS({
  isOpen: false,
});

function navBarReducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE:
      return state.set('isOpen', !action.isOpen);
    default:
      return state;
  }
}

export default navBarReducer;
