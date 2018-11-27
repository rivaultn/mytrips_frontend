/* eslint-disable no-underscore-dangle */
import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import { LOAD_TRIPS, LOAD_TEAMS } from 'containers/App/constants';
import {
  tripsLoaded,
  tripLoadingError,
  teamsLoaded,
  teamsLoadingError,
  loadTeams,
} from 'containers/App/actions';
import request from 'utils/request';
import { delay } from 'redux-saga';
import {
  ADDRESS_SERVER_TRIP,
  ADDRESS_SERVER_TEAM,
  ADDRESS_SERVER_PHOTO_DELETE,
} from '../../constants';
import {
  changeCurrentTrip,
  changeItemsToDisplayOnMap,
  setOpenModalError,
  setSuccess,
  toggleDeleteModal,
} from './actions';
import {
  makeSelectCurrentStep,
  makeSelectCurrentItemMapPage,
  makeSelectCurrentTrip,
  makeSelectIsListOfTrip,
  makeSelectItemToDelete,
} from './selectors';
import {
  DELETE_TRIP_BY_ID,
  EDIT_AND_SAVE_LOCATION,
  EDIT_AND_SAVE_SUBSTEP,
  SAVE_TEAMS,
  SET_PHOTO_IN_ONE,
} from './constants';
import { makeSelectTeams, makeSelectTrips } from '../App/selectors';
import {
  changeCurrentStepAddModal,
  createOrUpdateTrip,
  editAdd,
  setOriginalItem,
  tripSaved,
} from '../AddingModalContainer/actions';
import { CREATE_OR_UPDATE_TRIP } from '../AddingModalContainer/constants';
import messages from './messages';

/**
 * trips request/response handler
 */
export function* getTrips() {
  const requestURL = `${ADDRESS_SERVER_TRIP}`;

  try {
    // get trips and actualize state
    const trips = yield call(request, requestURL);
    yield put(tripsLoaded(trips));

    // actualize items to display on map
    yield put(
      changeItemsToDisplayOnMap(
        trips.map(a => a.steps.map(b => b.substeps)).flat(2),
      ),
    );
  } catch (err) {
    yield put(tripLoadingError(err));
  }
}

/**
 * teams request/response handler
 */
export function* getTeams() {
  const requestURL = ADDRESS_SERVER_TEAM;

  try {
    const teams = yield call(request, requestURL);
    yield put(teamsLoaded(teams));
  } catch (err) {
    yield put(teamsLoadingError(err));
  }
}

/**
 * Delete a team
 *
 * @param team {object}     the team object to delete
 */
export function* deleteTeam(team) {
  try {
    const requestDeleteSubstepURL = `${ADDRESS_SERVER_TEAM}/${team._id}`;

    yield call(request, requestDeleteSubstepURL, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (err) {
    yield put(setOpenModalError(true));
  }
}

/**
 * Edit informations substep
 *
 * @param action {object}   the action to parse
 */
export function* editSubstep(action) {
  const field = action.field;

  let index;
  // gets active items
  const trip = yield select(makeSelectCurrentTrip());
  const step = yield select(makeSelectCurrentStep());
  const substep = yield select(makeSelectCurrentItemMapPage());

  // edit trip
  substep[field] = action.newValue;

  index = step.substeps.findIndex(sub => sub._id === substep._id);
  step.substeps[index] = substep;

  index = trip.steps.findIndex(tripStep => tripStep._id === step._id);
  trip.steps[index] = step;

  // save the edited trip
  yield put(createOrUpdateTrip(trip, false, false));
}

/**
 * Edit the location substep
 *
 * @param action      the action to parse
 */
export function* editLocationSubstep(action) {
  let index;

  // gets active items
  const trip = yield select(makeSelectCurrentTrip());
  const step = yield select(makeSelectCurrentStep());
  const substep = yield select(makeSelectCurrentItemMapPage());

  // edits substeps
  substep.place = action.address;
  substep.lat = action.LatLng.lat;
  substep.long = action.LatLng.lng;

  index = step.substeps.findIndex(sub => sub._id === substep._id);
  step.substeps[index] = substep;

  index = trip.steps.findIndex(tripStep => tripStep._id === step._id);
  trip.steps[index] = step;

  // save edited trip
  yield put(createOrUpdateTrip(trip, false, false));
}

/**
 * Save a team
 *
 * @param team {object}   team to save
 * @param newTeam {boolean}     true if it's a new team
 */
export function* saveTeam(team, newTeam) {
  try {
    let requestURL = ADDRESS_SERVER_TEAM;

    if (!newTeam) {
      requestURL += `/${team._id}`;
    }

    yield call(request, requestURL, {
      method: newTeam ? 'POST' : 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        team,
      }),
    });
  } catch (err) {
    yield put(setOpenModalError(true));
  }
}

/**
 * Save a teams array
 *
 * @param action {object}   the action to parse
 */
export function* saveTeams(action) {
  try {
    const existingTeams = yield select(makeSelectTeams());
    let index;
    const teamsListToSave = action.teams;

    // array to store action to yield
    let actionsToYield = [];

    actionsToYield = existingTeams.map(existingTeam => {
      index = teamsListToSave.findIndex(
        teamToSave => teamToSave._id === existingTeam._id,
      );

      // if team no longer exist -> delete
      if (index === -1) {
        // eslint-disable-next-line redux-saga/yield-effects
        return call(deleteTeam, existingTeam);
      }

      // if team should be updated
      // eslint-disable-next-line redux-saga/yield-effects
      return call(saveTeam, teamsListToSave[index], false);
    });

    teamsListToSave.map(team => {
      // if it's a new team to create
      if (team._id === undefined) {
        // eslint-disable-next-line redux-saga/yield-effects
        actionsToYield.push(call(saveTeam, team, true));
      }
    });

    // call saving
    yield all(actionsToYield);
    // actualize teams
    yield put(loadTeams());

    // display success alert during 4s
    yield put(setSuccess(messages.teamsSaved.defaultMessage, true));
    yield delay(4000);
    yield put(setSuccess(false, false));
  } catch (err) {
    yield put(setOpenModalError(true));
  }
}

/**
 * Delete Photo corresponding to a step
 *
 * @param stepId {string}     the step id to delete
 */
export function* deletePhotoByStepId(stepId) {
  try {
    const requestDeleteSubstepURL = `${ADDRESS_SERVER_PHOTO_DELETE}${stepId}`;

    yield call(request, requestDeleteSubstepURL, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (err) {
    yield put(setOpenModalError(true));
  }
}

/**
 * Delete a trip
 */
export function* deleteTripById() {
  try {
    // get the trip to delete
    const itemToDelete = yield select(makeSelectItemToDelete());

    // delete of all of its steps
    yield all(
      itemToDelete.steps.map(step => call(deletePhotoByStepId, step._id)),
    );

    // delete trip
    const requestDeleteItemURL = `${ADDRESS_SERVER_TRIP}/${itemToDelete._id}`;

    yield call(request, requestDeleteItemURL, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // actualize existing trips
    const currentTrips = yield select(makeSelectTrips());

    const newTripsList = currentTrips.filter(
      trip => trip._id !== itemToDelete._id,
    );

    yield put(tripsLoaded(newTripsList));

    // actualize items on maps
    yield put(
      changeItemsToDisplayOnMap(
        newTripsList.map(a => a.steps.map(b => b.substeps)).flat(2),
      ),
    );

    // hide confirmation delete modal
    yield put(toggleDeleteModal());

    // display success alert during 4s
    yield put(setSuccess(messages.tripDeleted.defaultMessage, true));
    yield delay(4000);
    yield put(setSuccess(false, false));
  } catch (err) {
    yield put(setOpenModalError(true));
  }
}

/**
 * Save a trip
 *
 * @param action {object}   the action to parse
 */
export function* createOrUpdateTripSaving(action) {
  try {
    let requestURL = ADDRESS_SERVER_TRIP;

    // if trip should be update and not create
    if (!action.newTrip) {
      requestURL += `/${action.tripToSave._id}`;
    }

    // save trip
    const trip = yield call(request, requestURL, {
      method: action.newTrip ? 'POST' : 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        trip: action.tripToSave,
      }),
    });

    // actualize trip on state
    yield put(tripSaved(trip));
    // actualize trip reference
    yield put(setOriginalItem(trip));

    // if it's a new item, next step will update it
    if (action.newTrip) {
      yield put(editAdd(false));
    }

    // go to next step in adding / editing container if exists
    if (action.nextStep) {
      yield put(changeCurrentStepAddModal(action.nextStep));
    }

    // actualize existing trips list
    const tripsList = yield select(makeSelectTrips());
    const index = tripsList.findIndex(aTrip => aTrip._id === trip._id);

    if (index === -1) {
      tripsList.push(trip);
    } else {
      tripsList[index] = trip;
    }

    yield put(tripsLoaded(tripsList));

    // change current active trip
    yield put(changeCurrentTrip(trip));

    // actualize items on map if it's necessary
    if (yield select(makeSelectIsListOfTrip())) {
      yield put(
        changeItemsToDisplayOnMap(
          tripsList.map(a => a.steps.map(b => b.substeps)).flat(2),
        ),
      );
    }
  } catch (err) {
    yield put(setOpenModalError(true));
  }
}

/**
 * Set the photo in one of a trip
 *
 * @param action {object}   the action to parse
 */
export function* setPhotoInOne(action) {
  const trip = yield select(makeSelectCurrentTrip());

  trip.photoInOne = action.newPhotoInOne;

  yield put(createOrUpdateTrip(trip, false, false));
}
/**
 * Root saga manages watcher lifecycle
 */
export default function* tripData() {
  yield takeLatest(CREATE_OR_UPDATE_TRIP, createOrUpdateTripSaving);
  yield takeLatest(LOAD_TRIPS, getTrips);
  yield takeLatest(LOAD_TEAMS, getTeams);
  yield takeLatest(DELETE_TRIP_BY_ID, deleteTripById);
  yield takeLatest(SAVE_TEAMS, saveTeams);
  yield takeLatest(EDIT_AND_SAVE_SUBSTEP, editSubstep);
  yield takeLatest(EDIT_AND_SAVE_LOCATION, editLocationSubstep);
  yield takeLatest(SET_PHOTO_IN_ONE, setPhotoInOne);
}
