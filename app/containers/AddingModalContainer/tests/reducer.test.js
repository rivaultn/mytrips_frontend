import { fromJS } from 'immutable';
import addingModalComponentReducer from '../reducer';

describe('addingModalComponentReducer', () => {
  it('returns the initial state', () => {
    expect(addingModalComponentReducer(undefined, {})).toEqual(fromJS({}));
  });
});
