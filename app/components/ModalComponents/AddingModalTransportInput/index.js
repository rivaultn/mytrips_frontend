/**
 *
 * ModalAddTransportInput
 *
 */

import React, { Fragment } from 'react';
import { Col, Input } from 'reactstrap';
import PropTypes from 'prop-types';
import IconButton from '../../IconButton/Loadable';

function AddingModalTransportInput({ icon, index, onChange, transport }) {
  return (
    <Fragment>
      <Col md={1} className="pt-3">
        <IconButton icon={icon} size="lg" />
      </Col>
      <Col md={3} className="pt-3">
        <Input
          type="textarea"
          value={transport.comment}
          onChange={evt =>
            onChange(index, transport.transportType, evt.target.value)
          }
        />
      </Col>
    </Fragment>
  );
}

AddingModalTransportInput.propTypes = {
  // icon
  icon: PropTypes.any.isRequired,
  // numstep index
  index: PropTypes.number.isRequired,
  // function on edit transport data
  onChange: PropTypes.func.isRequired,
  // transport object
  transport: PropTypes.any.isRequired,
};

export default AddingModalTransportInput;
