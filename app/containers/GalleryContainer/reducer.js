/*
 *
 * GalleryContainer reducer
 *
 */

import { fromJS } from 'immutable';

export const initialState = fromJS({});

function galleryContainerReducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}

export default galleryContainerReducer;
