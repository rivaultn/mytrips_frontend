/**
 *
 * PhotoCommentComponent
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Col, Container, Row } from 'reactstrap';

const headerStyle = {
  color: '#B0BEC5',
  fontSize: '1em',
  fontWeight: 'bold',
};

function PopoverContainerComponent({
  style,
  componentToDisplay,
  componentTitle,
}) {
  return (
    <Container
      fluid
      style={{
        ...style,
        position: 'absolute',
        backgroundColor: '#546E7A',
        width: '100%',
        opacity: '0.96',
        boxSizing: 'border-box !important',
      }}
    >
      {componentTitle && (
        <Row style={headerStyle} className="pt-1">
          <Col>
            <h2>{componentTitle}</h2>
          </Col>
        </Row>
      )}

      <Row>
        <Col className="px-0">{componentToDisplay}</Col>
      </Row>
    </Container>
  );
}

PopoverContainerComponent.propTypes = {
  // component content to display
  componentToDisplay: PropTypes.any.isRequired,
  // specific style
  style: PropTypes.any,
  // component title
  componentTitle: PropTypes.any,
};

export default PopoverContainerComponent;
