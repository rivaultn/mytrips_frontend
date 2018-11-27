/**
 *
 * AddingModalComponent
 *
 * Modal component to add / edit a trip
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Modal, ModalHeader } from 'reactstrap';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import AddingModalFinalStepComponent from 'components/ModalComponents/AddingModalFinalStepComponent/Loadable';
import AddingModalProgressBar from 'components/ModalComponents/AddingModalProgressBar/Loadable';

import AddingModalStepEditingContainer from '../AddingModalStepEditingContainer/Loadable';
import AddingModalPhotoEditingContainer from '../AddingModalPhotoEditingContainer/Loadable';
import AddingModalTripEditingContainer from '../AddingModalTripEditingContainer/Loadable';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import {
  makeSelectAdd,
  makeSelectCurrentItem,
  makeSelectCurrentStep,
  makeSelectIsOpen,
} from './selectors';
import {
  toggleModal,
  createOrUpdateTrip,
  resetStep,
  changeCurrentStepAddModal,
} from './actions';
import { makeSelectTeams } from '../App/selectors';
import {
  EDIT_STEPS_MODAL_STEP,
  EDIT_TRIP_INFO_MODAL_STEP,
  UPLOAD_PHOTO_MODAL_STEP,
} from './constants';
import { makeSelectCurrentIndexEditingItem } from '../AddingModalPhotoEditingContainer/selectors';
import {
  setCurrentEditingStep,
  setCurrentIndexEditingItem,
} from '../AddingModalPhotoEditingContainer/actions';
import { UPLOAD_STEP_PHOTO_CONTAINER } from '../AddingModalPhotoEditingContainer/constants';

const HeaderModalStyle = {
  backgroundColor: '#455A64',
  borderBottom: '1px solid #37474F',
  color: '#B0BEC5',
};
/* eslint-disable react/prefer-stateless-function */
export class AddingModalContainer extends React.PureComponent {
  render() {
    return (
      <div>
        <Modal
          isOpen={this.props.isOpen}
          fade
          toggle={this.props.onToggleModal}
          size="lg"
        >
          <ModalHeader
            toggle={this.props.onToggleModal}
            style={HeaderModalStyle}
          >
            <FormattedMessage {...messages.modalTitle} />
          </ModalHeader>

          {/* Progress bar */}
          <AddingModalProgressBar
            currentStep={this.props.currentStep}
            stepsLength={
              this.props.currentEditingItem &&
              this.props.currentEditingItem.steps
                ? this.props.currentEditingItem.steps.length
                : 0
            }
            currentStepEditing={this.props.currentStepEditing}
          />

          {/* edit trip informations step */}
          {this.props.currentStep === 1 && (
            <AddingModalTripEditingContainer
              name={this.props.currentEditingItem.name}
              fromDate={this.props.currentEditingItem.from}
              toDate={this.props.currentEditingItem.to}
              onSubmit={() =>
                this.props.onSubmitFirstStep(
                  this.props.currentEditingItem,
                  this.props.add,
                )
              }
              onReset={this.props.onReset}
            />
          )}

          {/* edit step informations step */}
          {this.props.currentStep === 2 && (
            <AddingModalStepEditingContainer
              steps={this.props.currentEditingItem.steps}
              onPrevious={this.props.onReturnFirstStep}
              onReset={this.props.onReset}
              onSubmit={() =>
                this.props.onSubmitSecondStep(
                  this.props.currentEditingItem,
                  this.props.add,
                )
              }
            />
          )}

          {/* upload & edit photo informations step */}
          {this.props.currentStep === 3 && (
            <AddingModalPhotoEditingContainer
              steps={this.props.currentEditingItem.steps}
              currentStep={this.props.currentStep}
            />
          )}

          {/* final step */}
          {this.props.currentStep === 4 && <AddingModalFinalStepComponent />}
        </Modal>
      </div>
    );
  }
}

AddingModalContainer.propTypes = {
  // if component is open
  isOpen: PropTypes.bool.isRequired,
  // if it's a new trip
  add: PropTypes.bool.isRequired,
  // on toggle function
  onToggleModal: PropTypes.func.isRequired,
  // current adding / editing step
  currentStep: PropTypes.number.isRequired,
  // current step number
  currentStepEditing: PropTypes.number.isRequired,
  // current item to edit
  currentEditingItem: PropTypes.oneOfType([PropTypes.object, PropTypes.bool])
    .isRequired,
  // submit function for first step
  onSubmitFirstStep: PropTypes.func.isRequired,
  // submit function for second step
  onSubmitSecondStep: PropTypes.func.isRequired,
  // reset function
  onReset: PropTypes.func.isRequired,
  // function to return on first step
  onReturnFirstStep: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  isOpen: makeSelectIsOpen(),
  add: makeSelectAdd(),
  currentStep: makeSelectCurrentStep(),
  currentEditingItem: makeSelectCurrentItem(),
  teams: makeSelectTeams(),
  currentStepEditing: makeSelectCurrentIndexEditingItem(),
});

function mapDispatchToProps(dispatch) {
  return {
    // close modal & reset data
    onToggleModal: () => {
      dispatch(toggleModal());
      dispatch(setCurrentIndexEditingItem(0));
      dispatch(setCurrentEditingStep(UPLOAD_STEP_PHOTO_CONTAINER));
    },
    // save trip informations
    onSubmitFirstStep: (tripToSave, newTrip) =>
      dispatch(createOrUpdateTrip(tripToSave, newTrip, EDIT_STEPS_MODAL_STEP)),
    // save steps
    onSubmitSecondStep: (tripToSave, newTrip) =>
      dispatch(
        createOrUpdateTrip(tripToSave, newTrip, UPLOAD_PHOTO_MODAL_STEP),
      ),
    // reset informations
    onReset: () => dispatch(resetStep()),
    // return to first step
    onReturnFirstStep: () =>
      dispatch(changeCurrentStepAddModal(EDIT_TRIP_INFO_MODAL_STEP)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'addingModalComponent', reducer });
const withSaga = injectSaga({ key: 'addingModalComponent', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(AddingModalContainer);
