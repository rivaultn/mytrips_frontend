import { fromJS } from 'immutable';
import tripListItemReducer from '../reducer';

describe('tripListItemReducer', () => {
  it('returns the initial state', () => {
    expect(tripListItemReducer(undefined, {})).toEqual(fromJS({}));
  });
});
