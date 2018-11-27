import { fromJS } from 'immutable';
import addingModalTripEditingContainerReducer from '../reducer';

describe('addingModalTripEditingContainerReducer', () => {
  it('returns the initial state', () => {
    expect(addingModalTripEditingContainerReducer(undefined, {})).toEqual(fromJS({}));
  });
});
