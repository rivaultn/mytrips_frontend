import { fromJS } from 'immutable';
import addingModalStepEditingContainerReducer from '../reducer';

describe('addingModalStepEditingContainerReducer', () => {
  it('returns the initial state', () => {
    expect(addingModalStepEditingContainerReducer(undefined, {})).toEqual(fromJS({}));
  });
});
