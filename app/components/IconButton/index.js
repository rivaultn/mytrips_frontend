/**
 *
 * IconButton
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export class IconButton extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { hover: false };
  }

  hoverOn = () => {
    this.setState({ hover: true });
  };

  hoverOff = () => {
    this.setState({ hover: false });
  };

  // get the icon color
  getIconColor() {
    if (this.state.hover) {
      return this.props.hoverColor;
    }
    return this.props.baseColor;
  }

  render() {
    return (
      <FontAwesomeIcon
        icon={this.props.icon}
        size={this.props.size}
        disabled={this.props.disabled}
        onClick={this.props.onClick}
        style={this.props.specificStyle}
        color={this.getIconColor()}
        onMouseEnter={this.hoverOn}
        onMouseLeave={this.hoverOff}
      />
    );
  }
}

IconButton.propTypes = {
  // the icon to render
  icon: PropTypes.object.isRequired,
  // on click function to execute
  onClick: PropTypes.func,
  // font awesome icon size
  size: PropTypes.string,
  // if disabled
  disabled: PropTypes.bool,
  // specific style
  specificStyle: PropTypes.object,
  // base color, if hover is false
  baseColor: PropTypes.string,
  // hover color, if hover is true
  hoverColor: PropTypes.string,
};

export default IconButton;
