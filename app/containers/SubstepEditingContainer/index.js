/**
 *
 * SubstepEditingContainer
 *
 * Container to edit substeps informations
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { FormattedMessage } from 'react-intl';
import { Input, Label } from 'reactstrap';
import injectReducer from 'utils/injectReducer';
import EditableSpan from 'components/EditableSpan/Loadable';
import reducer from './reducer';

import { editSubstep, editLocation, setPhotoInOne } from '../MapPage/actions';
import messages from './messages';
import { makeSelectCurrentTrip } from '../MapPage/selectors';
import { makeSelectTeams } from '../App/selectors';

const InfoStyle = {
  color: '#B0BEC5',
  fontSize: '1em',
};

/* eslint-disable react/prefer-stateless-function */
export class SubstepEditingContainer extends React.PureComponent {
  isChecked(photo) {
    return this.props.currentTrip.photoInOne === photo;
  }

  render() {
    return (
      <div className="py-2 px-3">
        {/* radio button photo in one */}
        <p className="px-3 pb-2" style={InfoStyle}>
          <Label check>
            <Input
              type="radio"
              name="radio1"
              checked={this.isChecked(this.props.currentItem.photoMin)}
              onChange={() =>
                this.props.onCheckPhotoInOne(this.props.currentItem.photoMin)
              }
            />
            <FormattedMessage {...messages.photoInOneCheckBox} />
          </Label>
        </p>

        {/* editable span for substep place */}
        <EditableSpan
          place
          initialValue={this.props.currentItem.place}
          defaultValue={messages.place.defaultMessage}
          style={InfoStyle}
          onChangeFunc={returnValue =>
            this.props.onChangeLocationFunc(
              returnValue.address,
              returnValue.latLng,
            )
          }
        />

        {/* editable span for substep date */}
        <EditableSpan
          date
          field="date"
          defaultValue={messages.date.defaultMessage}
          className="pt-2"
          initialValue={this.props.currentItem.date}
          style={{ display: 'inline-block', ...InfoStyle }}
          onChangeFunc={returnValue =>
            this.props.onChangeFunc(returnValue.field, returnValue.value)
          }
        />

        {/* editable span for substep team */}
        <EditableSpan
          className="pt-4"
          initialValue={
            this.props.currentItem.team
              ? this.props.teams.find(
                team => team._id === this.props.currentItem.team,
              )._id
              : ''
          }
          field="team"
          team
          teams={this.props.teams}
          defaultValue={messages.team.defaultMessage}
          style={{ display: 'inline-block', ...InfoStyle }}
          onChangeFunc={returnValue =>
            this.props.onChangeFunc(returnValue.field, returnValue.value)
          }
        />

        {/* editable span for substep comment */}
        <EditableSpan
          className="pt-4"
          initialValue={this.props.currentItem.comment}
          field="comment"
          defaultValue={messages.comment.defaultMessage}
          style={{ display: 'inline-block' }}
          onChangeFunc={returnValue =>
            this.props.onChangeFunc(returnValue.field, returnValue.value)
          }
        />
      </div>
    );
  }
}

SubstepEditingContainer.propTypes = {
  // active item
  currentItem: PropTypes.any.isRequired,
  // active trip
  currentTrip: PropTypes.any.isRequired,
  // function on change informations
  onChangeFunc: PropTypes.func.isRequired,
  // function on change location
  onChangeLocationFunc: PropTypes.func.isRequired,
  // function on change photo in one
  onCheckPhotoInOne: PropTypes.func.isRequired,
  // existing teams array
  teams: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]).isRequired,
};

const mapStateToProps = createStructuredSelector({
  currentTrip: makeSelectCurrentTrip(),
  teams: makeSelectTeams(),
});

function mapDispatchToProps(dispatch) {
  return {
    onChangeFunc: (field, newValue) => dispatch(editSubstep(field, newValue)),
    onCheckPhotoInOne: photoInOne => dispatch(setPhotoInOne(photoInOne)),
    onChangeLocationFunc: (address, latLong) =>
      dispatch(editLocation(address, latLong)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'substepEditingContainer', reducer });

export default compose(
  withReducer,
  withConnect,
)(SubstepEditingContainer);
