/*
 *
 * AddingModalComponent reducer
 *
 */

import { fromJS } from 'immutable';
import {
  TOGGLE_ADDING_MODAL,
  ADD_NEW_STEP,
  ADD_TRANSPORT,
  REMOVE_TRANSPORT,
  EDIT_TRANSPORT,
  SET_SUBSTEP,
  DELETE_SUBSTEP,
  EDIT_SUBSTEP,
  EDIT_STEP,
  RESET_SECOND_STEP,
  CHANGE_LOCATION,
  TRIP_SAVED,
  CHANGE_CURRENT_STEP,
  EDIT_ADD,
  EDIT_TRIP_INFO,
  RESET_STEP,
  SET_ORIGINAL_ITEM,
  REMOVE_STEP,
} from './constants';

export const initialState = fromJS({
  isOpen: false,
  add: true,
  currentStep: 1,
  originalItem: false,
  currentEditingItem: {},
  defaultItem: {
    name: '',
    from: '',
    to: '',
    photoInOne: 'stepId/photoUuid/photoname.jpg',
    steps: [
      {
        name: '',
        from: '',
        to: '',
        transportations: [],
        substeps: [],
      },
    ],
  },
});

function addingModalComponentReducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_ADDING_MODAL:
      if (!state.get('isOpen')) {
        return state
          .set('isOpen', !state.get('isOpen'))
          .set('add', action.add)
          .set('currentStep', 1)
          .set('originalItem', fromJS(action.item))
          .set(
            'currentEditingItem',
            action.add ? state.get('defaultItem') : fromJS(action.item),
          );
      }

      return state.set('isOpen', !state.get('isOpen'));
    case TRIP_SAVED:
      return state.set('currentEditingItem', fromJS(action.trip));
    case CHANGE_CURRENT_STEP:
      return state.set('currentStep', action.newStep);
    case ADD_NEW_STEP:
      return state.updateIn(['currentEditingItem', 'steps'], list =>
        list.push(
          fromJS({
            name: '',
            from: '',
            to: '',
            transportations: [],
            substeps: [],
          }),
        ),
      );
    case SET_ORIGINAL_ITEM:
      return state.set('originalItem', fromJS(action.item));
    case RESET_STEP:
      return state.set(
        'currentEditingItem',
        state.get('originalItem')
          ? state.get('originalItem')
          : state.get('defaultItem'),
      );
    case EDIT_ADD:
      return state.set('add', action.add);
    case EDIT_STEP:
      return state.setIn(
        ['currentEditingItem', 'steps', action.index, action.field],
        action.newValue,
      );
    case EDIT_TRIP_INFO:
      return state.setIn(['currentEditingItem', action.field], action.newValue);
    case ADD_TRANSPORT:
      return state.updateIn(
        ['currentEditingItem', 'steps', action.index, 'transportations'],
        list =>
          list.push(
            fromJS({
              transportType: action.transport,
              comment: '',
            }),
          ),
      );
    case REMOVE_TRANSPORT:
      const indexOfItemToDelete = state
        .getIn(['currentEditingItem', 'steps', action.index, 'transportations'])
        .findIndex(list => list.get('transportType') === action.transport);
      return state.deleteIn([
        'currentEditingItem',
        'steps',
        action.index,
        'transportations',
        indexOfItemToDelete,
      ]);
    case REMOVE_STEP:
      return state.deleteIn([
        'currentEditingItem',
        'steps',
        action.index,
      ]);
    case EDIT_TRANSPORT:
      const indexOfItemToUpdate = state
        .getIn(['currentEditingItem', 'steps', action.index, 'transportations'])
        .findIndex(list => list.get('transportType') === action.transport);
      return state.setIn(
        [
          'currentEditingItem',
          'steps',
          action.index,
          'transportations',
          indexOfItemToUpdate,
          'comment',
        ],
        action.comment,
      );
    case RESET_SECOND_STEP:
      const originalItem = state.getIn(['originalItem', 'steps']);
      if (originalItem) {
        return state.setIn(
          ['currentEditingItem', 'steps'],
          state.getIn(['originalItem', 'steps']),
        );
      }

      return state.setIn(
        ['currentEditingItem', 'steps'],
        fromJS([
          {
            _id: 'aiaiaeb',
            name: '',
            from: '',
            to: '',
            transportations: [],
            substeps: [],
          },
        ]),
      );

    case SET_SUBSTEP:
      return state.updateIn(
        ['currentEditingItem', 'steps', action.numStep, 'substeps'],
        list =>
          list.push(
            fromJS({
              name: action.name,
              comment: '',
              uuid: action.uuid,
              photo: `${state.getIn([
                'currentEditingItem',
                'steps',
                action.numStep,
                '_id',
              ])}/${action.uuid}/${action.name}`,
              photoMin: `${state.getIn([
                'currentEditingItem',
                'steps',
                action.numStep,
                '_id',
              ])}/${action.uuid}/${action.nameMin}`,
              date: action.date,
              place: action.place,
              lat: action.lat,
              long: action.long,
            }),
          ),
      );
    case DELETE_SUBSTEP:
      const indexOfSubstepToDelete = state
        .getIn(['currentEditingItem', 'steps', action.numStep, 'substeps'])
        .findIndex(list => list.get('uuid') === action.uuid);
      return state.deleteIn([
        'currentEditingItem',
        'steps',
        action.numStep,
        'substeps',
        indexOfSubstepToDelete,
      ]);
    case EDIT_SUBSTEP:
      const indexOfSubstepToEdit = state
        .getIn(['currentEditingItem', 'steps', action.numStep, 'substeps'])
        .findIndex(list => list.get('uuid') === action.uuid);

      return state.setIn(
        [
          'currentEditingItem',
          'steps',
          action.numStep,
          'substeps',
          indexOfSubstepToEdit,
          action.field,
        ],
        action.newValue,
      );
    case CHANGE_LOCATION:
      const indOfSubstepToEdit = state
        .getIn(['currentEditingItem', 'steps', action.numStep, 'substeps'])
        .findIndex(list => list.get('uuid') === action.uuid);
      return state
        .setIn(
          [
            'currentEditingItem',
            'steps',
            action.numStep,
            'substeps',
            indOfSubstepToEdit,
            'place',
          ],
          action.address,
        )
        .setIn(
          [
            'currentEditingItem',
            'steps',
            action.numStep,
            'substeps',
            indOfSubstepToEdit,
            'lat',
          ],
          action.latLng.lat,
        )
        .setIn(
          [
            'currentEditingItem',
            'steps',
            action.numStep,
            'substeps',
            indOfSubstepToEdit,
            'long',
          ],
          action.latLng.lng,
        );
    default:
      return state;
  }
}

export default addingModalComponentReducer;
