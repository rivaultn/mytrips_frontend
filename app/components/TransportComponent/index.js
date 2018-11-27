/**
 *
 * TransportComponent
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'reactstrap';
import {
  faCar,
  faPlane,
  faMotorcycle,
  faBicycle,
  faShip,
  faWalking,
  faSubway,
  faBus,
} from '@fortawesome/free-solid-svg-icons/index';

import {
  BICYCLE,
  CAR,
  MOTORCYCLE,
  PLANE,
  SHIP,
  SUBWAY,
  WALKING,
  BUS,
} from './constants';
import IconButton from '../IconButton/Loadable';

const transportDivStyle = {
  padding: '4px 4px 4px 4px',
  width: '80%',
  color: '#78909C',
  margin: '8px auto 8px auto',
  borderRadius: '2%',
  backgroundColor: '#455A64',
};

export class TransportComponent extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { comment: '', cacheTarget: false };
  }

  onClickTransport(evt, newComment) {
    evt.preventDefault();

    this.setState({
      comment:
        this.state.cacheTarget === evt.target && this.state.comment !== ''
          ? ''
          : newComment,
      cacheTarget: evt.target,
    });
  }

  render() {
    let icon = false;

    const content = this.props.transports.map(transport => {
      switch (transport.transportType) {
        case CAR:
          icon = faCar;
          break;
        case PLANE:
          icon = faPlane;
          break;
        case MOTORCYCLE:
          icon = faMotorcycle;
          break;
        case BICYCLE:
          icon = faBicycle;
          break;
        case SHIP:
          icon = faShip;
          break;
        case SUBWAY:
          icon = faSubway;
          break;
        case WALKING:
          icon = faWalking;
          break;
        case BUS:
          icon = faBus;
          break;
        default:
          return false;
      }

      if (icon) {
        return (
          <NavLink href="#" key={`navlink-${transport._id}`}>
            <IconButton
              icon={icon}
              size="2x"
              key={`transport-${transport._id}`}
              onClick={evt => this.onClickTransport(evt, transport.comment)}
            />
          </NavLink>
        );
      }

      return false;
    });

    return (
      <div style={transportDivStyle}>
        <div
          className="d-flex flex-row"
          style={{ justifyContent: 'space-around' }}
        >
          {content}
        </div>

        <div>{this.state.comment}</div>
      </div>
    );
  }
}

TransportComponent.propTypes = {
  // steps transport array
  transports: PropTypes.array.isRequired,
};

export default TransportComponent;
