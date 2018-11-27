/**
 *
 * DatePickerComponent
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import 'moment/src/locale/fr';
moment.locale('fr');

function DatePickerComponent({ id, date, onChangeFunc }) {
  return (
    <DatePicker
      id={id}
      className="form-control"
      selected={date !== '' && date !== null ? moment(date) : null}
      onChange={newDate => onChangeFunc(newDate)}
    />
  );
}

DatePickerComponent.propTypes = {
  // id
  id: PropTypes.string.isRequired,
  // initial date
  date: PropTypes.any,
  // on change date function
  onChangeFunc: PropTypes.func.isRequired,
};

export default DatePickerComponent;
