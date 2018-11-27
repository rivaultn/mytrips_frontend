import { fromJS } from 'immutable';
import substepEditingContainerReducer from '../reducer';

describe('substepEditingContainerReducer', () => {
  it('returns the initial state', () => {
    expect(substepEditingContainerReducer(undefined, {})).toEqual(fromJS({}));
  });
});
