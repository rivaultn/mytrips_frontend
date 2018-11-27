import { fromJS } from 'immutable';
import galleryContainerReducer from '../reducer';

describe('galleryContainerReducer', () => {
  it('returns the initial state', () => {
    expect(galleryContainerReducer(undefined, {})).toEqual(fromJS({}));
  });
});
