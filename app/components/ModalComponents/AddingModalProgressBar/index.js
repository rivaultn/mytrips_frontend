/**
 *
 * AddingModalProgressBar
 *
 * Progress bar on adding/editing modal trip
 *
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Progress } from 'reactstrap';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

function AddingModalProgressBar({
  currentStep,
  stepsLength,
  currentStepEditing,
}) {
  return (
    <Progress multi>
      {/* trip informations editing */}
      {currentStep > 1 && (
        <Progress bar value="33" color="info">
          <FormattedMessage {...messages.tripEdit} />
        </Progress>
      )}

      {/* edit step informations */}
      {currentStep > 2 && (
        <Progress bar value="33" color="info">
          <FormattedMessage {...messages.stepsEdit} />
        </Progress>
      )}

      {/* edit substeps informations */}
      {currentStep === 3 && (
        <Fragment>
          <Progress
            bar
            value={(34 / stepsLength + 1) * currentStepEditing}
            color="info"
          >
            <FormattedMessage {...messages.photoUpload} />
          </Progress>
        </Fragment>
      )}

      {/* final step */}
      {currentStep === 4 && (
        <Progress bar value="34" color="info">
          <FormattedMessage {...messages.finish} />
        </Progress>
      )}
    </Progress>
  );
}

AddingModalProgressBar.propTypes = {
  // current step
  currentStep: PropTypes.number.isRequired,
  // total number of steps in trip
  stepsLength: PropTypes.number.isRequired,
  // current index of the step
  currentStepEditing: PropTypes.number.isRequired,
};

export default AddingModalProgressBar;
