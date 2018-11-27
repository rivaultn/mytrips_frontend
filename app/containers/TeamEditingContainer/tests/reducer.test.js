import { fromJS } from 'immutable';
import teamEditingContainerReducer from '../reducer';

describe('teamEditingContainerReducer', () => {
  it('returns the initial state', () => {
    expect(teamEditingContainerReducer(undefined, {})).toEqual(fromJS({}));
  });
});
