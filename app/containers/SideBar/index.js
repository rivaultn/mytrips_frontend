/**
 *
 * SideBar
 *
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Collapse, Navbar, NavbarToggler } from 'reactstrap';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import { FormattedMessage } from 'react-intl';
import ListItem from 'components/ListItem/Loadable';

import { toggle } from './actions';
import { makeSelectIsOpen } from './selector';
import List from '../../components/List/Loadable';
import reducer from './reducer';
import messages from './messages';
import { makeSelectTrips } from '../App/selectors';
import {
  makeSelectCurrentTrip,
  makeSelectIsListOfTrip,
} from '../MapPage/selectors';

export class SideBar extends React.PureComponent {
  render() {
    let content;
    // display loading component if trips are loading
    if (this.props.loading) {
      const LoadingComponent = () => <FormattedMessage {...messages.loading} />;
      content = <List component={LoadingComponent} />;
    }

    // display error component if error exists
    if (this.props.error !== false) {
      const ErrorComponent = () => <FormattedMessage {...messages.error} />;
      content = <List component={ErrorComponent} />;
    }

    // if trips are loaded display them
    if (this.props.trips !== false) {
      content = (
        <List
          isListOfTrip={this.props.isListOfTrip}
          items={
            this.props.isListOfTrip ? this.props.trips : this.props.currentTrip
          }
          component={ListItem}
        />
      );
    }

    return (
      <Fragment>
        <Navbar dark expand="lg">
          <NavbarToggler
            onClick={() => this.props.onToggle(this.props.isOpen)}
          />
          <Collapse isOpen={this.props.isOpen} navbar>
            {content}
          </Collapse>
        </Navbar>
      </Fragment>
    );
  }
}

SideBar.propTypes = {
  // if sidebar is open
  isOpen: PropTypes.bool.isRequired,
  // if trips are loading
  loading: PropTypes.bool,
  // if it's a trips list
  isListOfTrip: PropTypes.bool.isRequired,
  // if there is an error
  error: PropTypes.any,
  // existing trips list
  trips: PropTypes.any.isRequired,
  // active trip
  currentTrip: PropTypes.any.isRequired,
  // on toggle function
  onToggle: PropTypes.func.isRequired,
};

export function mapDispatchToProps(dispatch) {
  return {
    onToggle: isOpen => dispatch(toggle(isOpen)),
  };
}

const mapStateToProps = createStructuredSelector({
  isOpen: makeSelectIsOpen(),
  trips: makeSelectTrips(),
  isListOfTrip: makeSelectIsListOfTrip(),
  currentTrip: makeSelectCurrentTrip(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'sidebar', reducer });

export default compose(
  withReducer,
  withConnect,
)(SideBar);
