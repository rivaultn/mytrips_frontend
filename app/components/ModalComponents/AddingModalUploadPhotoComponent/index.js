/**
 *
 * AddingModalUploadPhotoComponent
 *
 * Upload photo Step on adding / editing component
 *
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { ModalBody } from 'reactstrap';
import GalleryWrapper from 'components/UploadGalleryWrapper/Loadable';
import { FormattedMessage } from 'react-intl';
import AddingModalFooter from '../AddingModalFooter/Loadable';
import messages from './messages';

const ModalStyle = {
  backgroundColor: '#263238',
  color: '#B0BEC5',
  fontSize: '0.9em',
  fontWeight: 'bold',
};

function AddingModalUploadPhotoComponent({
  step,
  currentIndexEditingItem,
  addSubstep,
  deleteSubstep,
  handleSubmit,
  handlePrevious,
}) {
  return (
    <Fragment>
      <ModalBody style={ModalStyle}>
        <div className="pb-2">
          <FormattedMessage {...messages.uploadPhotos} /> {step.name}
        </div>

        <GalleryWrapper
          step={step}
          currentIndexEditingItem={currentIndexEditingItem}
          addSubstep={addSubstep}
          deleteSubstep={deleteSubstep}
        />
      </ModalBody>

      <AddingModalFooter
        handleSubmit={handleSubmit}
        handlePrevious={handlePrevious}
      />
    </Fragment>
  );
}

AddingModalUploadPhotoComponent.propTypes = {
  // step to edit
  step: PropTypes.any.isRequired,
  // step index
  currentIndexEditingItem: PropTypes.number.isRequired,
  // function on submit
  handleSubmit: PropTypes.func.isRequired,
  // function on previous
  handlePrevious: PropTypes.func.isRequired,
  // add substep function
  addSubstep: PropTypes.func.isRequired,
  // delete substep function
  deleteSubstep: PropTypes.func.isRequired,
};

export default AddingModalUploadPhotoComponent;
