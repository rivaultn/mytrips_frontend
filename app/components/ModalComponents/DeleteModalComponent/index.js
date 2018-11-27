/**
 *
 * DeleteModalComponent
 *
 * Confirmation delete modal component
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
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
  fontSize: '1em',
  fontWeight: 'bold',
};

const FooterModalStyle = {
  backgroundColor: '#263238',
  borderTop: '1px solid #37474F',
};

function DeleteModalComponent({ open, isTrip, onClickDelete, toggleModal }) {
  const closeBtn = (
    <button className="close" onClick={toggleModal}>
      &times;
    </button>
  );

  return (
    <Modal isOpen={open} toggle={toggleModal}>
      <ModalHeader
        toggle={toggleModal}
        close={closeBtn}
        style={HeaderModalStyle}
      >
        <FormattedMessage {...messages.modalDeleteTitle} />
      </ModalHeader>

      <ModalBody style={ModalStyle}>
        <FormattedMessage {...messages.confirmationMessage} />{' '}
        {isTrip ? (
          <FormattedMessage {...messages.tripToDelete} />
        ) : (
          <FormattedMessage {...messages.stepToDelete} />
        )}
      </ModalBody>

      <ModalFooter style={FooterModalStyle}>
        <Button color="danger" onClick={onClickDelete}>
          <FormattedMessage {...messages.validModal} />
        </Button>
        <Button color="secondary" onClick={toggleModal}>
          <FormattedMessage {...messages.cancel} />
        </Button>
      </ModalFooter>
    </Modal>
  );
}

DeleteModalComponent.propTypes = {
  // if modal is opne
  open: PropTypes.bool.isRequired,
  // if item to delete is trip
  isTrip: PropTypes.bool.isRequired,
  // toggleModal function
  toggleModal: PropTypes.func.isRequired,
  // function on confirm delete
  onClickDelete: PropTypes.func.isRequired,
};

export default DeleteModalComponent;
