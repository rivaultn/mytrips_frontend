/*
 *
 * TeamEditingContainer reducer
 *
 */

import { fromJS } from 'immutable';
import {
  SET_TEAMS,
  SET_TEAM_VALUE,
  ADD_NEW_TEAM,
  DELETE_TEAM,
} from './constants';

export const initialState = fromJS({
  teams: [],
});

function teamEditingContainerReducer(state = initialState, action) {
  switch (action.type) {
    case SET_TEAMS:
      return state.set('teams', fromJS(action.teams));
    case SET_TEAM_VALUE:
      return state.setIn(
        ['teams', action.index, action.field],
        action.newValue,
      );
    case DELETE_TEAM:
      return state.deleteIn(['teams', action.index]);
    case ADD_NEW_TEAM:
      return state.update('teams', list =>
        list.push(
          fromJS({
            name: '',
            member: '',
            color: '#FFFFFF',
          }),
        ),
      );
    default:
      return state;
  }
}

export default teamEditingContainerReducer;
