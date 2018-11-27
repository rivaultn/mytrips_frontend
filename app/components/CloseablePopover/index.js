/**
 *
 * CloseablePopover
 *
 */

import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import IconButton from '../IconButton/Loadable';

const headerStyle = {
  backgroundColor: '#263238',
  color: '#B0BEC5',
  fontSize: '0.9em',
  fontWeight: 'bold',
};
function CloseablePopover({
  onClick,
  componentToDisplay,
  componentTitle,
  closeableOnSmallDevice,
}) {
  return (
    <Container fluid>
      <Row className="mb-4 mt-0 px-0 pt-2" style={headerStyle}>
        <Col xs={10}>{componentTitle}</Col>
        <Col xs={2} style={{ textAlign: 'center' }}>
          <div className={closeableOnSmallDevice ? '' : 'd-none d-xl-block'}>
            <a href="#" style={{ ':hover': { display: 'none' } }}>
              <IconButton
                icon={faTimes}
                size="2x"
                onClick={onClick}
                baseColor="#78909C"
                hoverColor="#CFD8DC"
              />
            </a>
          </div>
        </Col>
      </Row>

      <Row>
        <Col xs={12}>{componentToDisplay}</Col>
      </Row>
    </Container>
  );
}

CloseablePopover.propTypes = {
  // on close icon click
  onClick: PropTypes.func.isRequired,
  // should component be closeable on small device
  closeableOnSmallDevice: PropTypes.bool,
  // content component
  componentToDisplay: PropTypes.any.isRequired,
  // title component
  componentTitle: PropTypes.any,
};

export default CloseablePopover;
