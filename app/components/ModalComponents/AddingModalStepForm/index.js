/**
 *
 * AddingModalStepForm
 *
 * Form to edit step on adding / editing trip modal
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import {
  faBicycle,
  faBus,
  faCar,
  faMotorcycle,
  faPlane,
  faShip,
  faSubway,
  faWalking,
} from '@fortawesome/free-solid-svg-icons';
import { Col, FormGroup, Input, Label, Row } from 'reactstrap';
import PropTypes from 'prop-types';
import IconButton from 'components/IconButton/Loadable';
import DatePickerComponent from 'components/DatePickerComponent/Loadable';
import { faMinus } from '@fortawesome/free-solid-svg-icons/faMinus';
import messages from './messages';
import AddingModalTransportButton from '../AddingModalTransportButton/Loadable';
import AddingModalTransportInput from '../AddingModalTransportInput/Loadable';

const RowStyle = {
  borderBottom: '1px solid #37474F',
};
/* eslint-disable react/prefer-stateless-function */
class AddingModalStepForm extends React.PureComponent {
  render() {
    // get existing transports type in step
    const transports = this.props.step.transportations.map(
      transport => transport.transportType,
    );

    // transport possibilities associates to icon
    const transportPossibilities = [
      { transportType: 'CAR', icon: faCar },
      { transportType: 'PLANE', icon: faPlane },
      { transportType: 'MOTORCYCLE', icon: faMotorcycle },
      { transportType: 'BICYCLE', icon: faBicycle },
      { transportType: 'SHIP', icon: faShip },
      { transportType: 'SUBWAY', icon: faSubway },
      { transportType: 'WALKING', icon: faWalking },
      { transportType: 'BUS', icon: faBus },
    ];

    return (
      <Row className="pb-3 px-2" style={RowStyle}>
        {/* delete step */}
        <Col md={1} className="text-md-center">
          {this.props.index > 0 && (
            <a href="#">
              <IconButton
                icon={faMinus}
                baseColor="#BF360C"
                hoverColor="#DD2C00"
                size="lg"
                onClick={() =>
                  this.props.onClickStepDelete(this.props.index)
                }
              />
            </a>
          )}
        </Col>

        {/* name step edit */}
        <Col md={4}>
          <FormGroup>
            <Label for="nameInput">
              <FormattedMessage {...messages.name} />
            </Label>
            <Input
              id="nameInput"
              value={this.props.step.name}
              onChange={evt =>
                this.props.onChangeFunc(
                  this.props.index,
                  'name',
                  evt.target.value,
                )
              }
            />
          </FormGroup>
        </Col>

        {/* begin date edit */}
        <Col md={2}>
          <FormGroup>
            <Label for="fromDateInput">
              <FormattedMessage {...messages.fromDate} />
            </Label>
            <DatePickerComponent
              id="fromDateInput"
              date={this.props.step.from}
              onChangeFunc={newDate =>
                this.props.onChangeFunc(this.props.index, 'from', newDate)
              }
            />
          </FormGroup>
        </Col>

        {/* end date edit */}
        <Col md={2}>
          <FormGroup>
            <Label for="toDateInput">
              <FormattedMessage {...messages.toDate} />
            </Label>
            <DatePickerComponent
              id="toDateInput"
              date={this.props.step.to}
              onChangeFunc={newDate =>
                this.props.onChangeFunc(this.props.index, 'to', newDate)
              }
            />
          </FormGroup>
        </Col>

        {/* transport col to add new transport */}
        <Col md={3}>
          <Row className="text-center">
            <FormattedMessage {...messages.chooseTransport} />
          </Row>
          <Row className="pt-2">
            {transportPossibilities.map(transport => (
              <AddingModalTransportButton
                key={transport.transportType}
                icon={transport.icon}
                onClickTransport={
                  transports.includes(transport.transportType)
                    ? this.props.onClickTransportDelete
                    : this.props.onClickTransportAdd
                }
                clicked={transports.includes(transport.transportType)}
                index={this.props.index}
                transportType={transport.transportType}
              />
            ))}
          </Row>
        </Col>

        {/* transport row to edit saved transport */}
        {this.props.step.transportations.map(transport => (
          <AddingModalTransportInput
            key={transport.transportType}
            icon={
              transportPossibilities.find(
                possibility =>
                  possibility.transportType === transport.transportType,
              ).icon
            }
            index={this.props.index}
            onChange={(comment, index, transportType) =>
              this.props.onChangeTransport(comment, index, transportType)
            }
            transport={transport}
          />
        ))}
      </Row>
    );
  }
}

AddingModalStepForm.propTypes = {
  // current step
  step: PropTypes.any.isRequired,
  // index of the step
  index: PropTypes.number.isRequired,
  // on change function
  onChangeFunc: PropTypes.func.isRequired,
  // add transport function
  onClickTransportAdd: PropTypes.func.isRequired,
  // delete transport function
  onClickTransportDelete: PropTypes.func.isRequired,
  // delete step function
  onClickStepDelete: PropTypes.func.isRequired,
  // edit function transport
  onChangeTransport: PropTypes.func.isRequired,
};

export default AddingModalStepForm;
