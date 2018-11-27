/**
 *
 * ModalAddTransportButton
 *
 */

import React from 'react';
import { Col } from 'reactstrap';
import PropTypes from 'prop-types';
import IconButton from 'components/IconButton/Loadable';

function AddingModalTransportButton({
  icon,
  onClickTransport,
  index,
  transportType,
  clicked,
}) {
  return (
    <Col xs={3} className="pt-2">
      <a href="#">
        <IconButton
          icon={icon}
          baseColor={clicked ? '#B0BEC5' : '#607D8B'}
          hoverColor={clicked ? '#78909C' : '#455A64'}
          size="lg"
          onClick={() => onClickTransport(index, transportType)}
        />
      </a>
    </Col>
  );
}

AddingModalTransportButton.propTypes = {
  // icon
  icon: PropTypes.any.isRequired,
  // step index
  index: PropTypes.number.isRequired,
  // if transport exists
  clicked: PropTypes.bool,
  // transport type
  transportType: PropTypes.string.isRequired,
  // function to execute on click
  onClickTransport: PropTypes.func.isRequired,
};

export default AddingModalTransportButton;
