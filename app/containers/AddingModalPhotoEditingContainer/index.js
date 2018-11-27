/**
 *
 * AddingModalPhotoEditingContainer
 *
 * Component to upload and edit substeps (photo) on adding / editing trip modal
 *
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form, ModalBody } from 'reactstrap';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import AddingModalFooter from 'components/ModalComponents/AddingModalFooter/Loadable';
import AddingModalUploadPhotoComponent from 'components/ModalComponents/AddingModalUploadPhotoComponent/Loadable';
import AddingModalPhotoForm from 'components/ModalComponents/AddingModalPhotoForm/Loadable';
import injectReducer from 'utils/injectReducer';
import { FormattedMessage } from 'react-intl';
import reducer from './reducer';
import { setCurrentEditingStep, setCurrentIndexEditingItem } from './actions';
import {
  makeSelectCurrentEditingStep,
  makeSelectCurrentIndexEditingItem,
} from './selectors';
import { makeSelectTeams } from '../App/selectors';
import {
  addSubstep,
  changeCurrentStepAddModal,
  changeLocation,
  createOrUpdateTrip,
  deleteSubstep,
  editSubstep,
  resetStep,
} from '../AddingModalContainer/actions';
import {
  EDIT_STEPS_MODAL_STEP,
  FINAL_MODAL_STEP,
} from '../AddingModalContainer/constants';
import {
  EDIT_STEP_PHOTO_CONTAINER,
  UPLOAD_STEP_PHOTO_CONTAINER,
} from './constants';

import messages from './messages';
import { loadJS } from '../App';
import { makeSelectCurrentItem } from '../AddingModalContainer/selectors';
import { changeItemsToDisplayOnMap } from '../MapPage/actions';
import { API_KEY } from '../../constants';

const ModalStyle = {
  backgroundColor: '#263238',
  color: '#B0BEC5',
  fontSize: '1.1em',
  fontWeight: 'bold',
};

/* eslint-disable react/prefer-stateless-function */
export class AddingModalPhotoEditingContainer extends React.PureComponent {
  componentDidMount() {
    loadJS(
      `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=places`,
      'mapsApi',
    );
  }

  render() {
    return (
      <Fragment>
        {/* upload photo step */}
        {this.props.currentEditingStep === 1 && (
          <AddingModalUploadPhotoComponent
            step={this.props.steps[this.props.currentIndexEditingItem]}
            currentIndexEditingItem={this.props.currentIndexEditingItem}
            addSubstep={this.props.addSubstep}
            deleteSubstep={this.props.deleteSubstep}
            handleSubmit={() =>
              this.props.submitUpload(
                this.props.currentIndexEditingItem,
                this.props.currentEditingItem,
              )
            }
            handlePrevious={() =>
              this.props.previousStepUpload(this.props.currentIndexEditingItem)
            }
          />
        )}

        {/* edit photo informations step */}
        {this.props.currentEditingStep === 2 && (
          <Fragment>
            <ModalBody style={ModalStyle}>
              <div className="pb-2">
                <FormattedMessage {...messages.editPhotos} />
                {this.props.steps[this.props.currentIndexEditingItem].name}
              </div>

              <Form>
                {this.props.steps[
                  this.props.currentIndexEditingItem
                ].substeps.map(substep => (
                  <AddingModalPhotoForm
                    key={substep.photo}
                    numStep={this.props.currentIndexEditingItem}
                    substep={substep}
                    onClickPhotoDelete={this.props.onClickPhotoDelete}
                    onChangeFunc={this.props.onChangeFunc}
                    onChangeLocationFunc={(adress, lat, lng) =>
                      this.props.onChangeLocationFunc(
                        this.props.currentIndexEditingItem,
                        substep.uuid,
                        adress,
                        lat,
                        lng,
                      )
                    }
                    teams={this.props.teams}
                  />
                ))}
              </Form>
            </ModalBody>

            <AddingModalFooter
              handlePrevious={this.props.previousStepEdited}
              handleReset={this.props.onReset}
              handleSubmit={() =>
                this.props.submitEdited(
                  this.props.currentIndexEditingItem,
                  this.props.currentEditingItem,
                )
              }
            />
          </Fragment>
        )}
      </Fragment>
    );
  }
}

AddingModalPhotoEditingContainer.propTypes = {
  // array of existing steps in the trip
  steps: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]).isRequired,
  // array of existing teams
  teams: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]).isRequired,
  // item currently editing
  currentEditingItem: PropTypes.oneOfType([PropTypes.bool, PropTypes.any])
    .isRequired,
  // current modal step
  currentEditingStep: PropTypes.number.isRequired,
  // index of the step currently editing
  currentIndexEditingItem: PropTypes.number.isRequired,
  // step currently editing
  currentStep: PropTypes.any.isRequired,
  // save substep function
  addSubstep: PropTypes.func.isRequired,
  // delete substep function upload gallery
  deleteSubstep: PropTypes.func.isRequired,
  // on edit function
  onChangeFunc: PropTypes.func.isRequired,
  // on delete function edit substep informations step
  onClickPhotoDelete: PropTypes.func.isRequired,
  // reset modal
  onReset: PropTypes.func.isRequired,
  // function to edit substep location
  onChangeLocationFunc: PropTypes.func.isRequired,
  // submit upload substep
  submitUpload: PropTypes.func.isRequired,
  // function to go to previous step on upload step
  previousStepUpload: PropTypes.func.isRequired,
  // function to submit edited photo informations
  submitEdited: PropTypes.func.isRequired,
  // function to go to previous on editing step
  previousStepEdited: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  teams: makeSelectTeams(),
  currentEditingStep: makeSelectCurrentEditingStep(),
  currentIndexEditingItem: makeSelectCurrentIndexEditingItem(),
  currentEditingItem: makeSelectCurrentItem(),
});

export function mapDispatchToProps(dispatch, ownProps) {
  return {
    // delete substep
    onClickPhotoDelete: (numStep, uuid) =>
      dispatch(deleteSubstep(numStep, uuid)),

    submitUpload: (currentIndex, tripToSave) => {
      dispatch(createOrUpdateTrip(tripToSave, false, false));

      // if step doesn't contains substeps
      if (ownProps.steps[currentIndex].substeps.length === 0) {
        // if current step is not the last one
        if (ownProps.steps.length - 1 > currentIndex) {
          dispatch(setCurrentIndexEditingItem(currentIndex + 1));
        } else {
          dispatch(changeCurrentStepAddModal(FINAL_MODAL_STEP));
        }
      } else {
        dispatch(setCurrentEditingStep(EDIT_STEP_PHOTO_CONTAINER));
      }
    },

    previousStepUpload: currentIndex => {
      // if current step is the first one
      if (currentIndex === 0) {
        dispatch(changeCurrentStepAddModal(EDIT_STEPS_MODAL_STEP));
      } else {
        dispatch(setCurrentIndexEditingItem(currentIndex - 1));
        // if previous step doesn't have substeps
        if (ownProps.steps[currentIndex - 1].substeps.length === 0) {
          dispatch(setCurrentEditingStep(UPLOAD_STEP_PHOTO_CONTAINER));
        } else {
          dispatch(setCurrentEditingStep(EDIT_STEP_PHOTO_CONTAINER));
        }
      }
    },

    submitEdited: (currentIndex, tripToSave) => {
      // save trip
      dispatch(createOrUpdateTrip(tripToSave, false));
      // set items displayed on map
      dispatch(
        changeItemsToDisplayOnMap(
          tripToSave.steps.map(step => step.substeps).flat(),
        ),
      );
      // if current step is not the last one
      if (ownProps.steps.length - 1 > currentIndex) {
        dispatch(setCurrentIndexEditingItem(currentIndex + 1));
        dispatch(setCurrentEditingStep(UPLOAD_STEP_PHOTO_CONTAINER));
      } else {
        dispatch(changeCurrentStepAddModal(FINAL_MODAL_STEP));
      }
    },

    // go to upload step
    previousStepEdited: () => {
      dispatch(setCurrentEditingStep(UPLOAD_STEP_PHOTO_CONTAINER));
    },

    addSubstep: (numStep, name, nameMin, uuid, date, long, lat) =>
      dispatch(addSubstep(numStep, name, nameMin, uuid, date, long, lat)),
    deleteSubstep: (numStep, uuid) => dispatch(deleteSubstep(numStep, uuid)),
    onReset: () => dispatch(resetStep()),
    onChangeFunc: (numStep, uuid, field, value) =>
      dispatch(editSubstep(numStep, uuid, field, value)),
    onChangeLocationFunc: (numStep, uuid, adress, lat, lng) =>
      dispatch(changeLocation(numStep, uuid, adress, lat, lng)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({
  key: 'addingModalPhotoEditingContainer',
  reducer,
});

export default compose(
  withReducer,
  withConnect,
)(AddingModalPhotoEditingContainer);
