/**
 *
 * ColorPicker
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { SketchPicker } from 'react-color';

const colorStyle = {
  width: '100%',
  height: '100%',
  borderRadius: '5%',
};

const popoverStyle = {
  position: 'absolute',
  zIndex: '3000',
};

const swatchStyle = {
  width: '100%',
  height: '100%',
  padding: '5px',
  background: '#fff',
  borderRadius: '5px',
  boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
  display: 'inline-block',
  cursor: 'pointer',
};

const coverStyle = {
  position: 'fixed',
  top: '0px',
  right: '0px',
  bottom: '0px',
  left: '0px',
};

class ColorPicker extends React.PureComponent {
  state = {
    displayColorPicker: false,
  };

  // on click
  handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker });
  };

  // on close
  handleClose = () => {
    this.setState({ displayColorPicker: false });
  };

  render() {
    return (
      <div
        style={{
          width: '100%',
          height: '100%',
        }}
      >
        <div style={swatchStyle} onClick={this.handleClick}>
          <div style={{ ...colorStyle, background: this.props.color }} />
        </div>
        {this.state.displayColorPicker ? (
          <div style={popoverStyle}>
            <div style={coverStyle} onClick={this.handleClose} />
            <SketchPicker
              color={this.props.color}
              onChangeComplete={color => this.props.onChange(color.hex)}
            />
          </div>
        ) : null}
      </div>
    );
  }
}

ColorPicker.propTypes = {
  // color to display
  color: PropTypes.string.isRequired,
  // on change color function
  onChange: PropTypes.func.isRequired,
};

export default ColorPicker;
