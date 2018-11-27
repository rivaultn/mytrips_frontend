/**
 *
 * AddingModalFinalStepComponent
 *
 * Final step on adding/editing trip modal component
 *
 */

import React, { Fragment } from 'react';
import { ModalBody } from 'reactstrap';
import { FormattedMessage } from 'react-intl';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import messages from './messages';

const ModalStyle = {
  backgroundColor: '#263238',
  color: '#B0BEC5',
  fontSize: '1.1em',
  fontWeight: 'bold',
};

function AddingModalFinalStepComponent() {
  return (
    <Fragment>
      <ModalBody style={ModalStyle}>
        <div
          style={{ width: '50%', textAlign: 'center' }}
          className="mx-auto my-auto"
        >
          <FontAwesomeIcon
            icon={faCheckCircle}
            size="9x"
            color="#0277BD"
            className="pb-3"
          />
          <br />
          <FormattedMessage {...messages.success} />
        </div>
      </ModalBody>
    </Fragment>
  );
}

AddingModalFinalStepComponent.propTypes = {};

export default AddingModalFinalStepComponent;
