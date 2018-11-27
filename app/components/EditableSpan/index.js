/**
 *
 * EditableSpan
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'reactstrap';
import InputPlaceAutocomplete from '../InputPlaceAutocomplete/Loadable';
import DatePickerComponent from '../DatePickerComponent/Loadable';

/* eslint-disable react/prefer-stateless-function */
class EditableSpan extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      edit: false, // if value is currently editing
      valueToDisplay: this.props.initialValue, // current value
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.initialValue !== this.props.initialValue) {
      this.setState({ valueToDisplay: this.props.initialValue, edit: false });
    }
  }

  editing = () => {
    this.setState({ edit: true });
  };

  edit = valueToDisplay => {
    this.setState({ valueToDisplay });
  };

  // save modifications
  save = returnValue => {
    this.props.onChangeFunc(returnValue);
    this.setState({ edit: false });
  };

  // get text to render in span tag
  getTextToRender() {
    if (
      this.state.valueToDisplay === '' ||
      this.state.valueToDisplay === null
    ) {
      return this.props.defaultValue;
    }
    if (this.props.date) {
      return new Date(this.state.valueToDisplay).toLocaleDateString();
    }
    if (this.props.team) {
      return this.props.teams.find(
        team => team._id === this.state.valueToDisplay,
      ).name;
    }
    return this.state.valueToDisplay;
  }

  render() {
    let componentToRender = <div />;
    // if value is currently editing
    if (this.state.edit) {
      // if it's an address
      if (this.props.place) {
        componentToRender = (
          <InputPlaceAutocomplete
            address={this.state.valueToDisplay}
            onChangeLocationFunc={(address, latLng) => {
              const returnValue = {};
              returnValue.address = address;
              returnValue.latLng = latLng;
              this.edit(address);
              this.save(returnValue);
            }}
          />
        );
        // if it's a date
      } else if (this.props.date) {
        componentToRender = (
          <DatePickerComponent
            date={this.state.valueToDisplay}
            onChangeFunc={newDate => {
              this.edit(newDate);
              this.save({ field: this.props.field, value: newDate });
            }}
          />
        );
        // if it's the team
      } else if (this.props.team) {
        componentToRender = (
          <Input
            value={this.state.valueToDisplay}
            type="select"
            name="selectTeam"
            id="selectTeam"
            onChange={evt => {
              this.edit(evt.target.value);
              this.save({ field: this.props.field, value: evt.target.value });
            }}
          >
            <option>{this.props.defaultValue}</option>
            {this.props.teams.map(team => (
              <option value={team._id} key={`teamEditComponent-${team._id}`}>
                {team.name}
              </option>
            ))}
          </Input>
        );
        // if it's a simple text
      } else {
        componentToRender = (
          <Input
            onBlur={evt =>
              this.save({
                field: this.props.field,
                value: evt.target.value,
              })
            }
            onChange={evt => {
              this.edit(evt.target.value);
            }}
            value={this.state.valueToDisplay}
          />
        );
      }
    } else {
      componentToRender = (
        <span style={this.props.style} onClick={this.editing}>
          {this.getTextToRender()}
        </span>
      );
    }

    return <div className="mb-3">{componentToRender}</div>;
  }
}

EditableSpan.propTypes = {
  // initial value
  initialValue: PropTypes.any,
  // default value
  defaultValue: PropTypes.string.isRequired,
  // corresponding property object
  field: PropTypes.string,
  // specific style
  style: PropTypes.any,
  // if it's an address
  place: PropTypes.bool,
  // if it's a team
  team: PropTypes.bool,
  // teams array if the object to edit is a team
  teams: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  // if it's a date
  date: PropTypes.bool,
  // function to execute on change
  onChangeFunc: PropTypes.func.isRequired,
};

export default EditableSpan;
