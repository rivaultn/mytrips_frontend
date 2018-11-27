/*
 *
 * TripListItem reducer
 *
 */

import { fromJS } from 'immutable';

export const initialState = fromJS({});

function tripListItemReducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}

export default tripListItemReducer;
