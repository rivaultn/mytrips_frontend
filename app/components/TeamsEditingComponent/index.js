/**
 *
 * TeamsEditingContainer
 *
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Col, FormGroup, Input } from 'reactstrap';
import { faMinus } from '@fortawesome/free-solid-svg-icons';
import IconButton from '../IconButton/Loadable';
import ColorPicker from '../ColorPicker/Loadable';
import messages from './messages';

/* eslint-disable react/prefer-stateless-function */
function TeamsEditingComponent({ team, index, onChangeFunc, deleteTeamFunc }) {
  return (
    <Fragment>
      {/* delete icon */}
      <Col md={1} className="mb-3">
        <a href="#">
          <IconButton
            icon={faMinus}
            baseColor="#BF360C"
            hoverColor="#DD2C00"
            size="lg"
            onClick={() => deleteTeamFunc(index)}
          />
        </a>
      </Col>

      {/* team color edit */}
      <Col md={2} className="mb-3">
        <FormGroup style={{ height: '70%' }}>
          <ColorPicker
            color={team.color}
            onChange={color => onChangeFunc(index, 'color', color)}
          />
        </FormGroup>
      </Col>

      {/* team name edit */}
      <Col md={4} className="mb-3">
        <FormGroup>
          <Input
            placeholder={messages.name.defaultMessage}
            value={team.name}
            onChange={evt => onChangeFunc(index, 'name', evt.target.value)}
          />
        </FormGroup>
      </Col>

      {/* team members edit */}
      <Col md={5} className="mb-3">
        <FormGroup>
          <Input
            placeholder={messages.members.defaultMessage}
            value={team.member}
            onChange={evt => onChangeFunc(index, 'member', evt.target.value)}
          />
        </FormGroup>
      </Col>
    </Fragment>
  );
}

TeamsEditingComponent.propTypes = {
  // team to edit
  team: PropTypes.any.isRequired,
  // index in teams array
  index: PropTypes.number.isRequired,
  // on change function to edit
  onChangeFunc: PropTypes.func.isRequired,
  // delete function
  deleteTeamFunc: PropTypes.func.isRequired,
};

export default TeamsEditingComponent;
