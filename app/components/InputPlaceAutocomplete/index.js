/**
 *
 * InputPlaceAutocomplete
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import { Input } from 'reactstrap';

/* eslint-disable react/prefer-stateless-function */
class InputPlaceAutocomplete extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      address: this.props.address !== undefined ? this.props.address : '',
    };
  }

  // on address change
  handleChange = address => {
    this.setState({ address });
  };

  // on address select
  handleSelect = address => {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(this.setState({ address }))
      .then(latLng => this.props.onChangeLocationFunc(address, latLng));
  };

  render() {
    return (
      <PlacesAutocomplete
        value={this.state.address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <Input
              value={this.state.address}
              {...getInputProps({
                className: 'location-search-input',
              })}
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map(suggestion => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';
                const style = suggestion.active
                  ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                  : { backgroundColor: '#ffffff', cursor: 'pointer' };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    );
  }
}

InputPlaceAutocomplete.propTypes = {
  // function to execute on change
  onChangeLocationFunc: PropTypes.func,
  // current address
  address: PropTypes.string,
};

export default InputPlaceAutocomplete;
