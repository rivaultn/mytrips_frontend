import React from 'react';
import PropTypes from 'prop-types';
import { Collapse, Nav, Navbar, NavbarBrand, NavbarToggler } from 'reactstrap';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import injectReducer from 'utils/injectReducer';
import {
  faPaperPlane,
  faArrowLeft,
  faPlus,
  faEdit,
} from '@fortawesome/free-solid-svg-icons';
import IconButton from 'components/IconButton/Loadable';
import NavBarItem from 'components/NavBarItem/Loadable';

import messages from './messages';
import reducer from './reducer';
import { toggle } from './actions';
import { makeSelectIsOpen } from './selector';
import {
  changeItemsToDisplayOnMap,
  displayGallery,
  returnToTripList,
} from '../MapPage/actions';
import {
  changeCurrentStepAddModal,
  toggleModal,
} from '../AddingModalContainer/actions';
import { makeSelectCurrentTrip } from '../MapPage/selectors';
import { EDIT_TRIP_INFO_MODAL_STEP } from '../AddingModalContainer/constants';
import { makeSelectTrips } from '../App/selectors';

const linkStyle = {
  fontWeight: 'bold',
  textShadow: '1px 1px 1px rgba(0,0,0,0.2)',
};

const navBarStyle = {
  backgroundColor: '#0277BD',
  color: 'white',
  paddingBottom: '0px',
};

/* eslint-disable react/prefer-stateless-function */
class NavBar extends React.PureComponent {
  render() {
    return (
      <div>
        <Navbar
          light
          className="px-0 d-lg-flex flex-lg-column"
          style={navBarStyle}
          expand="lg"
        >
          <NavbarBrand
            href="/"
            style={{ ...linkStyle, color: '#22313f' }}
            className="px-lg-0"
          >
            <IconButton icon={faPaperPlane} size="2x" />
            {' MyTrips'}
          </NavbarBrand>
          <NavbarToggler
            className="mx-3"
            onClick={() => this.props.onToggle(this.props.isOpen)}
          />

          <Collapse
            isOpen={this.props.isOpen}
            navbar
            style={{ width: '100%' }}
            className="mt-3"
          >
            <Nav navbar vertical style={{ width: '100%' }}>
              {/* <NavBarItem icon={faFilter} href="#" message={messages.filter} /> */}
              {!this.props.isListOfTrip && (
                <NavBarItem
                  icon={faArrowLeft}
                  secondary
                  href="/"
                  onClick={evt =>
                    this.props.onReturnClick(evt, this.props.trips)
                  }
                  message={messages.return}
                />
              )}
              <NavBarItem
                icon={this.props.isListOfTrip ? faPlus : faEdit}
                href="#"
                secondary
                message={
                  this.props.isListOfTrip ? messages.addTrip : messages.editTrip
                }
                onClick={() =>
                  this.props.onToggleAddingModal(
                    this.props.isListOfTrip,
                    this.props.currentTrip,
                  )
                }
              />
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

NavBar.propTypes = {
  // if navbar should be fully displayed
  isOpen: PropTypes.bool.isRequired,
  // on toggle function
  onToggle: PropTypes.func.isRequired,
  // function to return from a steps list to a trips list
  onReturnClick: PropTypes.func.isRequired,
  // on toggle adding modal
  onToggleAddingModal: PropTypes.func.isRequired,
  // if it's a trip list
  isListOfTrip: PropTypes.bool.isRequired,
  // the active trip
  currentTrip: PropTypes.any.isRequired,
  // array of existing trips
  trips: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]).isRequired,
};

export function mapDispatchToProps(dispatch) {
  return {
    onToggle: isOpen => dispatch(toggle(isOpen)),
    onReturnClick: (evt, trips) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      // return to trips list
      dispatch(
        returnToTripList(trips.map(a => a.steps.map(b => b.substeps)).flat(2)),
      );
      // hide gallery
      dispatch(displayGallery(false));
    },
    onToggleAddingModal: (isListOfTrip, currentTrip) => {
      // display adding / editing modal
      dispatch(toggleModal(isListOfTrip, currentTrip));
      // initialize step
      dispatch(changeCurrentStepAddModal(EDIT_TRIP_INFO_MODAL_STEP));
      // hide gallery
      dispatch(displayGallery(false));
      if (currentTrip) {
        dispatch(
          changeItemsToDisplayOnMap(
            currentTrip.steps.map(step => step.substeps).flat(),
          ),
        );
      }
    },
  };
}

const mapStateToProps = createStructuredSelector({
  isOpen: makeSelectIsOpen(),
  currentTrip: makeSelectCurrentTrip(),
  trips: makeSelectTrips(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'navbar', reducer });

export default compose(
  withReducer,
  withConnect,
)(NavBar);
