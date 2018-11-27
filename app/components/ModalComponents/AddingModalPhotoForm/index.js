/**
 *
 * AddingModalPhotoForm
 *
 * Form to edit substeps on adding/editing trip modal
 */

import React, { Fragment } from 'react';
import { Col, FormGroup, Input, Label, Row } from 'reactstrap';
import PropTypes from 'prop-types';
import { faMinus } from '@fortawesome/free-solid-svg-icons/faMinus';
import InputPlaceAutocomplete from 'components/InputPlaceAutocomplete/Loadable';
import DatePickerComponent from 'components/DatePickerComponent/Loadable';
import IconButton from 'components/IconButton/Loadable';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import { ADDRESS_SERVER_PHOTO } from '../../../constants';

const RowStyle = {
  borderBottom: '1px solid #37474F',
};

/* eslint-disable react/prefer-stateless-function */
class AddingModalPhotoForm extends React.PureComponent {
  render() {
    return (
      <Fragment>
        <Row className="py-3" style={RowStyle}>
          {/* delete photo */}
          <Col md={1}>
            <a href="#">
              <IconButton
                icon={faMinus}
                baseColor="#BF360C"
                hoverColor="#DD2C00"
                size="lg"
                onClick={() =>
                  this.props.onClickPhotoDelete(
                    this.props.numStep,
                    this.props.substep.uuid,
                  )
                }
              />
            </a>
          </Col>

          {/* miniature photo */}
          <Col md={3}>
            <img
              src={`${ADDRESS_SERVER_PHOTO}${this.props.substep.photoMin}`}
              style={{ width: '100%' }}
            />
          </Col>

          {/* name photo edit */}
          <Col md={4}>
            <FormGroup>
              <Label for="nameInput">
                <FormattedMessage {...messages.name} />
              </Label>
              <Input
                id="nameInput"
                value={this.props.substep.name}
                onChange={evt => {
                  this.props.onChangeFunc(
                    this.props.numStep,
                    this.props.substep.uuid,
                    'name',
                    evt.target.value,
                  );
                }}
              />
            </FormGroup>
          </Col>

          {/* comment photo edit */}
          <Col md={4}>
            <FormGroup>
              <Label for="commentInput">
                <FormattedMessage {...messages.comment} />
              </Label>
              <Input
                type="textarea"
                id="commentInput"
                value={this.props.substep.comment}
                onChange={evt =>
                  this.props.onChangeFunc(
                    this.props.numStep,
                    this.props.substep.uuid,
                    'comment',
                    evt.target.value,
                  )
                }
              />
            </FormGroup>
          </Col>

          {/* date photo edit */}
          <Col md={4}>
            <FormGroup>
              <Label for="dateInput">
                <FormattedMessage {...messages.date} />
              </Label>
              <DatePickerComponent
                id="dateInput"
                date={this.props.substep.date}
                onChangeFunc={newFromDate =>
                  this.props.onChangeFunc(
                    this.props.numStep,
                    this.props.substep.uuid,
                    'date',
                    newFromDate,
                  )
                }
              />
            </FormGroup>
          </Col>

          {/* team photo edit */}
          <Col md={4}>
            <FormGroup>
              <Label for="selectTeam">
                <FormattedMessage {...messages.teams} />
              </Label>
              <Input
                value={this.props.substep.team}
                type="select"
                name="selectTeam"
                id="selectTeam"
                onChange={evt =>
                  this.props.onChangeFunc(
                    this.props.numStep,
                    this.props.substep.uuid,
                    'team',
                    evt.target.value,
                  )
                }
              >
                <option>{messages.noTeam.defaultMessage}</option>
                {this.props.teams.map(team => (
                  <option
                    value={team._id}
                    key={`teamEditComponent-${team._id}`}
                  >
                    {team.name}
                  </option>
                ))}
              </Input>
            </FormGroup>
          </Col>

          {/* address photo edit */}
          <Col md={4}>
            <Label for="placeInput">
              <FormattedMessage {...messages.place} />
            </Label>
            <InputPlaceAutocomplete
              address={this.props.substep.place}
              onChangeLocationFunc={this.props.onChangeLocationFunc}
              id="placeInput"
            />
          </Col>
        </Row>
      </Fragment>
    );
  }
}

AddingModalPhotoForm.propTypes = {
  // teams array
  teams: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  // step number
  numStep: PropTypes.number.isRequired,
  // substep to edit
  substep: PropTypes.any.isRequired,
  // on change function
  onChangeFunc: PropTypes.func.isRequired,
  // on delete function
  onClickPhotoDelete: PropTypes.func.isRequired,
  // on change function on address edit
  onChangeLocationFunc: PropTypes.func.isRequired,
};

export default AddingModalPhotoForm;
