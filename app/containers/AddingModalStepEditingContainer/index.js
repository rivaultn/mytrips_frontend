/**
 *
 * AddingModalStepEditingContainer
 *
 * Component to edit steps on adding / editing trip modal
 *
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Col, Form, ModalBody, Row } from 'reactstrap';
import AddingModalStepForm from 'components/ModalComponents/AddingModalStepForm/Loadable';
import IconButton from 'components/IconButton/Loadable';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import AddingModalFooter from 'components/ModalComponents/AddingModalFooter/Loadable';
import injectReducer from 'utils/injectReducer';
import reducer from './reducer';
import {
  addNewStep,
  addTransport,
  editStep,
  editTransport,
  removeStep,
  removeTransport,
} from '../AddingModalContainer/actions';

const ModalStyle = {
  backgroundColor: '#263238',
  color: '#B0BEC5',
  fontSize: '1.1em',
  fontWeight: 'bold',
};

/* eslint-disable react/prefer-stateless-function */
export class AddingModalStepEditingContainer extends React.PureComponent {
  render() {
    return (
      <Fragment>
        <ModalBody style={ModalStyle} className="pb-0">
          <Form>
            {/* editing form for each steps from the trip */}
            {this.props.steps.map((step, index) => (
              <AddingModalStepForm
                key={`AddingModalStepForm-${step}${index}`}
                step={step}
                index={index}
                onChangeFunc={this.props.onChangeFunc}
                onClickTransportAdd={this.props.onClickTransportAdd}
                onClickTransportDelete={this.props.onClickTransportDelete}
                onClickStepDelete={this.props.onClickStepDelete}
                onChangeTransport={this.props.onChangeTransport}
              />
            ))}

            {/* add new step */}
            <Row>
              <Col className="py-2">
                <a href="#" className="align-middle">
                  <IconButton
                    icon={faPlus}
                    baseColor="#607D8B"
                    hoverColor="#455A64"
                    size="lg"
                    onClick={this.props.addStep}
                  />
                </a>
              </Col>
            </Row>
          </Form>
        </ModalBody>

        <AddingModalFooter
          handleSubmit={this.props.onSubmit}
          handleReset={this.props.onReset}
          handlePrevious={this.props.onPrevious}
        />
      </Fragment>
    );
  }
}

AddingModalStepEditingContainer.propTypes = {
  // steps array from the trip
  steps: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
  // function to add a new step
  addStep: PropTypes.func,
  // on change informations functions
  onChangeFunc: PropTypes.func,
  // function to add new transport
  onClickTransportAdd: PropTypes.func,
  // function to delete transport
  onClickTransportDelete: PropTypes.func,
  // delete step function
  onClickStepDelete: PropTypes.func,
  // on change informations transport function
  onChangeTransport: PropTypes.func,
  // on submit function
  onSubmit: PropTypes.func,
  // on reset function
  onReset: PropTypes.func,
  // on go to previous step function
  onPrevious: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({});

function mapDispatchToProps(dispatch) {
  return {
    addStep: () => dispatch(addNewStep()),
    onChangeFunc: (index, field, newValue) =>
      dispatch(editStep(index, field, newValue)),
    onClickTransportAdd: (index, transport) =>
      dispatch(addTransport(index, transport)),
    onClickTransportDelete: (index, transport) =>
      dispatch(removeTransport(index, transport)),
    onClickStepDelete: index => dispatch(removeStep(index)),
    onChangeTransport: (index, transport, comment) =>
      dispatch(editTransport(index, transport, comment)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({
  key: 'addingModalStepEditingContainer',
  reducer,
});

export default compose(
  withReducer,
  withConnect,
)(AddingModalStepEditingContainer);
