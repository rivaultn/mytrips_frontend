/**
 *
 * ErrorModalComponent
 *
 * Error modal
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

const HeaderModalStyle = {
  backgroundColor: '#455A64',
  borderBottom: '1px solid #37474F',
  color: '#B0BEC5',
};

const ModalStyle = {
  backgroundColor: '#263238',
  color: '#B0BEC5',
  fontSize: '1.1em',
  fontWeight: 'bold',
};

const FooterModalStyle = {
  backgroundColor: '#263238',
  borderTop: '1px solid #37474F',
};

function ErrorModalComponent({ isOpen, toggleFunction }) {
  return (
    <div style={{ zIndex: '3000' }}>
      <Modal isOpen={isOpen} toggle={() => toggleFunction(!isOpen)}>
        <ModalHeader
          toggle={() => toggleFunction(!isOpen)}
          style={HeaderModalStyle}
        >
          <FormattedMessage {...messages.error} />
        </ModalHeader>

        <ModalBody style={ModalStyle}>
          <div
            style={{ width: '50%', textAlign: 'center' }}
            className="mx-auto my-auto"
          >
            <FontAwesomeIcon
              icon={faExclamationCircle}
              size="9x"
              color="#D84315"
              className="pb-3"
            />
            <br />
            <FormattedMessage {...messages.errorMessage} />
          </div>
        </ModalBody>

        <ModalFooter style={FooterModalStyle}>
          <Button color="secondary" onClick={() => toggleFunction(!isOpen)}>
            <FormattedMessage {...messages.ok} />
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

ErrorModalComponent.propTypes = {
  // if modal is open
  isOpen: PropTypes.bool.isRequired,
  // toggle function
  toggleFunction: PropTypes.func.isRequired,
};

export default ErrorModalComponent;
