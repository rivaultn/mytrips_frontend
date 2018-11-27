import { fromJS } from 'immutable';
import addingModalPhotoEditingContainerReducer from '../reducer';

describe('addingModalPhotoEditingContainerReducer', () => {
  it('returns the initial state', () => {
    expect(addingModalPhotoEditingContainerReducer(undefined, {})).toEqual(fromJS({}));
  });
});
