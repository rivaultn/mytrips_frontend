import { call, put, takeLatest } from 'redux-saga/effects';
import moment from 'moment';
import request from 'utils/request';
import { ADD_SUBSTEP } from './constants';
import { setSubstep } from './actions';
import {API_KEY} from "../../constants";

/**
 * Get date & the place corresponding to the lat & long photo if exists in exift data, then call action setSubstep
 * to set data in the container state
 *
 * @param action {object}     the action to parse
 */
export function* addSubstep(action) {
  let long = '';
  let lat = '';
  let place = '';
  let date = '';

  // if exif data date exists
  if (action.date) {
    date = moment.unix(action.date);
  }

  // if exif data longitude & latitude exists
  if (action.long && action.lat) {
    long = action.long;
    lat = action.lat;

    const requestURL = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${API_KEY}`;

    const places = yield call(request, requestURL);

    // get formatted address
    place = places.results[0].formatted_address;
  }

  // set results in container state
  yield put(
    setSubstep(
      action.numStep,
      action.name,
      `${action.name.substr(
        0,
        action.name.lastIndexOf('.'),
      )}-min${action.name.substr(
        action.name.lastIndexOf('.'),
        action.name.length,
      )}`,
      action.uuid,
      date,
      long,
      lat,
      place,
    ),
  );
}

export default function* containerData() {
  yield takeLatest(ADD_SUBSTEP, addSubstep);
}
