/**
 *
 * AddingModalFooter
 *
 * Footer on adding/editing trip modal
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Button, ModalFooter } from 'reactstrap';
import { FormattedMessage } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faSave, faUndo } from '@fortawesome/free-solid-svg-icons';

import messages from './messages';

const FooterModalStyle = {
  backgroundColor: '#263238',
  borderTop: '1px solid #37474F',
};

function AddingModalFooter({ handleSubmit, handleReset, handlePrevious }) {
  return (
    <ModalFooter
      style={FooterModalStyle}
      className="flex-wrap justify-content-start"
    >
      {/* previous button */}
      {handlePrevious && (
        <Button onClick={handlePrevious} className="mx-auto mx-md-2">
          <FontAwesomeIcon icon={faArrowLeft} size="1x" />{' '}
          <FormattedMessage {...messages.previous} />
        </Button>
      )}

      {/* reset button */}
      {handleReset && (
        <Button onClick={handleReset} className="mx-auto mx-md-2">
          <FontAwesomeIcon icon={faUndo} size="1x" />{' '}
          <FormattedMessage {...messages.cancel} />
        </Button>
      )}

      {/* submit button */}
      <Button
        onClick={handleSubmit}
        className={`mx-auto mx-md-2 mt-md-0 ${
          handleReset && handlePrevious ? 'mt-2' : ''
        }`}
      >
        <FontAwesomeIcon icon={faSave} size="1x" />{' '}
        <FormattedMessage {...messages.save} />
      </Button>
    </ModalFooter>
  );
}

AddingModalFooter.propTypes = {
  // function to execute on submit click
  handleSubmit: PropTypes.func.isRequired,
  // function to execute on reset click
  handleReset: PropTypes.func,
  // function to execute on previous click
  handlePrevious: PropTypes.func,
};

export default AddingModalFooter;
