/**
 *
 * TripListItem
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'reactstrap';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import FadeIn from 'react-fade-in';
import ImgListItem from 'components/ImgListItem/Loadable';

import {
  displayGallery,
  changeCurrentTrip,
  changeCurrentStep,
  toggleDeleteModal,
  changeItemsToDisplayOnMap,
} from '../MapPage/actions';
import { toggle } from '../SideBar/actions';
import reducer from './reducer';
import {
  changeCurrentStepAddModal,
  toggleModal,
} from '../AddingModalContainer/actions';
import { makeSelectCurrentTrip } from '../MapPage/selectors';
import { EDIT_STEPS_MODAL_STEP } from '../AddingModalContainer/constants';
import { setCurrentEditingStep } from '../AddingModalPhotoEditingContainer/actions';
import { UPLOAD_STEP_PHOTO_CONTAINER } from '../AddingModalPhotoEditingContainer/constants';

/* eslint-disable react/prefer-stateless-function */
export class TripListItem extends React.PureComponent {
  render() {
    return (
      <NavLink href="#">
        <FadeIn delay={60} transitionDuration={2500}>
          <ImgListItem
            item={this.props.item}
            isListOfTrip={this.props.isListOfTrip}
            onClick={
              this.props.isListOfTrip
                ? this.props.onChangeCurrentTrip
                : this.props.onChangeCurrentStep
            }
            onDeleteClick={this.props.toggleDelete}
            onEditClick={() =>
              this.props.isListOfTrip
                ? this.props.openEditModal(this.props.item)
                : this.props.openEditModalStep(this.props.currentTrip)
            }
          />
        </FadeIn>
      </NavLink>
    );
  }
}

TripListItem.propTypes = {
  // item to display
  item: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]).isRequired,
  // if it's a trips list
  isListOfTrip: PropTypes.bool.isRequired,
  // on change active trip function
  onChangeCurrentTrip: PropTypes.func.isRequired,
  // on change active step function
  onChangeCurrentStep: PropTypes.func.isRequired,
  // toggle delete modal
  toggleDelete: PropTypes.func.isRequired,
  // open editing modal to add new trip
  openEditModal: PropTypes.func.isRequired,
  // open editing modal to edit current trip
  openEditModalStep: PropTypes.func.isRequired,
  currentTrip: PropTypes.any.isRequired,
};

export function mapDispatchToProps(dispatch, ownProps) {
  return {
    onChangeCurrentTrip: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      // change active trip
      dispatch(changeCurrentTrip(ownProps.item));
      // change items to display on map
      dispatch(
        changeItemsToDisplayOnMap(
          ownProps.item.steps.map(step => step.substeps).flat(),
        ),
      );
    },
    onChangeCurrentStep: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      // actualize marker on map
      dispatch(changeItemsToDisplayOnMap(ownProps.item.substeps.flat()));
      // change active step
      dispatch(changeCurrentStep(ownProps.item));
      if (ownProps.item.substeps.length > 0) {
        dispatch(displayGallery(true));
      }
      dispatch(toggle(true));
    },
    toggleDelete: () => dispatch(toggleDeleteModal(ownProps.item)),
    openEditModal: item => dispatch(toggleModal(false, item)),
    openEditModalStep: trip => {
      // open editing modal
      dispatch(toggleModal(false, trip));
      // open editing step step
      dispatch(changeCurrentStepAddModal(EDIT_STEPS_MODAL_STEP));
      // reset upload photo container
      dispatch(setCurrentEditingStep(UPLOAD_STEP_PHOTO_CONTAINER));
    },
  };
}

const mapStateToProps = createStructuredSelector({
  currentTrip: makeSelectCurrentTrip(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'triplistitem', reducer });

export default compose(
  withReducer,
  withConnect,
)(TripListItem);
