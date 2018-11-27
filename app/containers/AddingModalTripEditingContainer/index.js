/**
 *
 * AddingModalTripEditingContainer
 *
 * Component to edit trip informations on adding / editing trip modal
 *
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Form, FormGroup, Input, Label, ModalBody } from 'reactstrap';
import AddingModalFooter from 'components/ModalComponents/AddingModalFooter/Loadable';
import DatePickerComponent from 'components/DatePickerComponent/Loadable';
import injectReducer from 'utils/injectReducer';
import reducer from './reducer';
import messages from './messages';
import { editInfoTrip } from '../AddingModalContainer/actions';

const ModalStyle = {
  backgroundColor: '#263238',
  color: '#B0BEC5',
  fontSize: '1.1em',
  fontWeight: 'bold',
};

/* eslint-disable react/prefer-stateless-function */
export class AddingModalTripEditingContainer extends React.PureComponent {
  render() {
    return (
      <Fragment>
        <ModalBody style={ModalStyle}>
          <Form>
            {/* edit trip name */}
            <FormGroup>
              <Label for="nameInput">
                <FormattedMessage {...messages.name} />
              </Label>
              <Input
                id="nameInput"
                value={this.props.name}
                required
                onChange={evt =>
                  this.props.onChangeFunc('name', evt.target.value)
                }
              />
            </FormGroup>

            {/* edit trip begin date */}
            <FormGroup>
              <Label for="fromDateInput">
                <FormattedMessage {...messages.fromDate} />
              </Label>
              <DatePickerComponent
                id="fromDateInput"
                date={this.props.fromDate}
                onChangeFunc={newDate =>
                  this.props.onChangeFunc('from', newDate)
                }
              />
            </FormGroup>

            {/* edit trip end date */}
            <FormGroup>
              <Label for="toDateInput">
                <FormattedMessage {...messages.toDate} />
              </Label>
              <DatePickerComponent
                id="toDateInput"
                date={this.props.toDate}
                onChangeFunc={newDate => this.props.onChangeFunc('to', newDate)}
              />
            </FormGroup>
          </Form>
        </ModalBody>

        <AddingModalFooter
          handleSubmit={this.props.onSubmit}
          handleReset={this.props.onReset}
        />
      </Fragment>
    );
  }
}

AddingModalTripEditingContainer.propTypes = {
  // trip begin date
  fromDate: PropTypes.any,
  // trip end date
  toDate: PropTypes.any,
  // if it's a new trip
  add: PropTypes.bool,
  // trip name
  name: PropTypes.string,
  // on submit step function
  onSubmit: PropTypes.func.isRequired,
  // on reset step function
  onReset: PropTypes.func.isRequired,
  // on edit informations function
  onChangeFunc: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({});

function mapDispatchToProps(dispatch) {
  return {
    onChangeFunc: (field, newValue) => dispatch(editInfoTrip(field, newValue)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({
  key: 'addingModalTripEditingContainer',
  reducer,
});

export default compose(
  withReducer,
  withConnect,
)(AddingModalTripEditingContainer);
