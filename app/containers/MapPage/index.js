/**
 * Application page
 */

import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { Alert, Col, Row } from 'reactstrap';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import {
  makeSelectTrips,
  makeSelectLoading,
  makeSelectError,
  makeSelectTeams,
} from 'containers/App/selectors';
import { faUserFriends } from '@fortawesome/free-solid-svg-icons';
import { FormattedMessage } from 'react-intl';
import CloseablePopover from 'components/CloseablePopover/Loadable';
import RightLinkPopoverComponent from 'components/PopoverComponent/PopoverLinkComponent/Loadable';
import RightPopoverComponent from 'components/PopoverComponent/PopoverContainerComponent/Loadable';
import DeleteModalComponent from 'components/ModalComponents/DeleteModalComponent/Loadable';
import {
  makeSelectCurrentTrip,
  makeSelectIsListOfTrip,
  makeSelectDisplayGallery,
  makeSelectItemsToDisplayOnMap,
  makeSelectDisplayTeamsPopover,
  makeSelectItemToDelete,
  makeSelectDeleteModalIsOpen,
  makeSelectOpenModalError,
  makeSelectCurrentStep,
  makeSelectSuccess,
  makeSelectSuccessMessage,
} from './selectors';
import messages from './messages';
import { loadTeams, loadTrips } from '../App/actions';
import reducer from './reducer';
import saga from './saga';
import MapContainer from '../MapContainer/Loadable';
import SideBar from '../SideBar/Loadable';
import NavBar from '../NavBar/Loadable';
import GalleryContainer from '../GalleryContainer/Loadable';
import AddingModalContainer from '../AddingModalContainer/Loadable';
import { ADDRESS_SERVER_PHOTO } from '../../constants';
import {
  deleteTripById,
  displayTeamsPopover,
  setOpenModalError,
  toggleDeleteModal,
} from './actions';
import ErrorModalComponent from '../../components/ModalComponents/ErrorModalComponent/Loadable';
import TeamEditingContainer from '../TeamEditingContainer/Loadable';
import { setTeams } from '../TeamEditingContainer/actions';

const RowStyle = {
  width: '100%',
  height: '100%',
  margin: '0',
  backgroundColor: '#263238',
};

const ColStyle = {
  height: '100%',
  padding: 0,
  backgroundColor: '#263238',
};

const ColSideBarStyle = {
  backgroundColor: '#263238',
  paddingLeft: '0px',
  paddingRight: '0px',
  overflowY: 'auto',
  borderRight: '1px solid #455A64',
};

const RowMapStyle = {
  width: '100%',
  marginRight: 0,
  marginLeft: 0,
};

/* eslint-disable react/prefer-stateless-function */
export class MapPage extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = { photoToDisplay: [] };
  }

  componentDidMount() {
    this.props.getTrips();
    this.props.getTeams();
  }

  componentDidUpdate(prevProps) {
    // if step changes, update photo to display array
    if (prevProps.currentStep._id !== this.props.currentStep._id) {
      const photoToDisplay = [];

      this.props.itemsToDisplayOnMap.forEach(item => {
        photoToDisplay.push({
          original: `${ADDRESS_SERVER_PHOTO}${item.photo}`,
          thumbnail: `${ADDRESS_SERVER_PHOTO}${item.photoMin}`,
        });
      });

      this.setState({ photoToDisplay });
    }
  }

  render() {
    // team editing component
    const PopoverContentComponent = (
      <CloseablePopover
        onClick={evt => this.props.clickDisplayTeams(evt, this.props.teams)}
        componentTitle={
          <h2>
            <FormattedMessage {...messages.myTeams} />
          </h2>
        }
        componentToDisplay={<TeamEditingContainer />}
        closeableOnSmallDevice
      />
    );

    return (
      <Fragment>
        <Row style={RowStyle}>
          {/* sidebar */}
          <Col lg="3" style={ColSideBarStyle}>
            <NavBar isListOfTrip={this.props.isListOfTrip} vertical />
            <SideBar
              loading={this.props.loading}
              erro={this.props.error}
              isListOfTrip={this.props.isListOfTrip}
            />
          </Col>

          <Col lg="9" style={ColStyle}>
            {this.props.displayGallery ? (
              <Fragment>
                {/* map row */}
                <Row style={{ height: '25%', ...RowMapStyle }}>
                  <MapContainer style={{ height: '25%', width: '100%' }} />
                </Row>

                {/* gallery row */}
                <Row style={{ paddingTop: '1%', ...RowMapStyle }}>
                  <GalleryContainer
                    photosToDisplay={this.state.photoToDisplay}
                  />
                </Row>
              </Fragment>
            ) : (
              <Row style={{ height: '100%', ...RowMapStyle }}>
                <MapContainer style={{ height: '100%', width: '100%' }} />

                {/* team popover link */}
                {!this.props.displayTeamsPopover && (
                  <RightLinkPopoverComponent
                    icon={faUserFriends}
                    specificStyle={{ right: 0, top: 30 }}
                    onClick={evt =>
                      this.props.clickDisplayTeams(evt, this.props.teams)
                    }
                  />
                )}

                {/* team popover */}
                <RightPopoverComponent
                  componentToDisplay={PopoverContentComponent}
                  style={{
                    display: this.props.displayTeamsPopover ? 'block' : 'none',
                    zIndex: this.props.displayTeamsPopover ? '1000' : '',
                    top: 30,
                    right: 0,
                    height: '100%',
                    overflow: 'auto',
                  }}
                />

                {/* alert component */}
                {this.props.success && (
                  <Alert
                    color="success"
                    style={{ position: 'absolute', bottom: 0, left: 0, zIndex: '3000' }}
                  >
                    {this.props.successMessage}
                  </Alert>
                )}
              </Row>
            )}
          </Col>
        </Row>

        {/* Adding / editing modal container */}
        <AddingModalContainer />

        {/* Confirmation modal on delete */}
        <DeleteModalComponent
          open={this.props.deleteModalIsOpen}
          toggleModal={this.props.onToggleDeleteModal}
          isTrip={this.props.isListOfTrip}
          onClickDelete={this.props.deleteId}
        />

        {/* Error modal */}
        <ErrorModalComponent
          isOpen={this.props.openModalError}
          toggleFunction={open => this.props.toggleFunctionErrorModal(open)}
        />
      </Fragment>
    );
  }
}

MapPage.propTypes = {
  // if data is currently loading
  loading: PropTypes.bool.isRequired,
  // success message if alert is called
  successMessage: PropTypes.oneOfType([PropTypes.string, PropTypes.bool])
    .isRequired,
  // success to display success alert
  success: PropTypes.bool.isRequired,
  // if gallery should be displayed
  displayGallery: PropTypes.bool.isRequired,
  // if team editing container should be displayed
  displayTeamsPopover: PropTypes.bool.isRequired,
  // if there is an error
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]).isRequired,
  // if error modal should be displayed
  openModalError: PropTypes.bool.isRequired,
  // existing trips array
  trips: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]).isRequired,
  // existing teams array
  teams: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]).isRequired,
  // items to display on map
  itemsToDisplayOnMap: PropTypes.any,
  // current active item
  currentItem: PropTypes.any,
  // current active step
  currentStep: PropTypes.any.isRequired,
  // current active trip
  currentTrip: PropTypes.oneOfType([PropTypes.object, PropTypes.bool])
    .isRequired,
  // if sidebar is displaying a list of trip
  isListOfTrip: PropTypes.bool.isRequired,
  // get existing trips function
  getTrips: PropTypes.func.isRequired,
  // get existing teams function
  getTeams: PropTypes.func.isRequired,
  // function to display team component
  clickDisplayTeams: PropTypes.func.isRequired,
  // function in editing informations on gallery container
  onGalleryEditFunc: PropTypes.func,
  // function on toggle delete modal
  onToggleDeleteModal: PropTypes.func.isRequired,
  // function to delete trip
  deleteId: PropTypes.func.isRequired,
  // toggle function for error modal
  toggleFunctionErrorModal: PropTypes.func.isRequired,
  // if delete modal is open
  deleteModalIsOpen: PropTypes.bool.isRequired,
  // item to delete
  itemToDelete: PropTypes.oneOfType([PropTypes.any, PropTypes.bool]).isRequired,
};

export function mapDispatchToProps(dispatch) {
  return {
    getTrips: () => dispatch(loadTrips()),
    getTeams: () => dispatch(loadTeams()),
    onToggleDeleteModal: () => dispatch(toggleDeleteModal()),
    clickDisplayTeams: (evt, teams) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(displayTeamsPopover());
      dispatch(setTeams(teams));
    },
    deleteId: () => dispatch(deleteTripById()),
    toggleFunctionErrorModal: open => dispatch(setOpenModalError(open)),
  };
}

const mapStateToProps = createStructuredSelector({
  trips: makeSelectTrips(),
  teams: makeSelectTeams(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
  openModalError: makeSelectOpenModalError(),
  currentTrip: makeSelectCurrentTrip(),
  currentStep: makeSelectCurrentStep(),
  isListOfTrip: makeSelectIsListOfTrip(),
  displayGallery: makeSelectDisplayGallery(),
  displayTeamsPopover: makeSelectDisplayTeamsPopover(),
  itemsToDisplayOnMap: makeSelectItemsToDisplayOnMap(),
  deleteModalIsOpen: makeSelectDeleteModalIsOpen(),
  itemToDelete: makeSelectItemToDelete(),
  success: makeSelectSuccess(),
  successMessage: makeSelectSuccessMessage(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'map', reducer });
const withSaga = injectSaga({ key: 'map', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(MapPage);
