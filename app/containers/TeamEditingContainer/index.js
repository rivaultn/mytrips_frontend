/**
 *
 * TeamEditingContainer
 *
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { faPlus, faSave, faUndo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Form, Row } from 'reactstrap';
import IconButton from 'components/IconButton/Loadable';
import TeamsEditingComponent from 'components/TeamsEditingComponent/Loadable';
import injectReducer from 'utils/injectReducer';
import reducer from './reducer';
import messages from './messages';

import { makeSelectTeams } from '../App/selectors';
import { saveTeams } from '../MapPage/actions';
import { makeSelectTeamContainerTeams } from './selectors';
import { addNewTeam, deleteTeam, setTeams, setTeamValue } from './actions';

/* eslint-disable react/prefer-stateless-function */
export class TeamEditingContainer extends React.PureComponent {
  render() {
    return (
      <Fragment>
        <Form>
          {/* editing form */}
          <Row className="px-5">
            {this.props.teams.map((team, index) => (
              <TeamsEditingComponent
                key={`teamEditComponent-${team._id}${index}`}
                deleteTeamFunc={this.props.deleteTeamFunc}
                onChangeFunc={this.props.onChangeFunc}
                team={team}
                index={index}
              />
            ))}
          </Row>
        </Form>

        {/* add new team icon */}
        <Row
          className="pl-5 pb-4"
          style={{ borderBottom: '1px solid #455A64' }}
        >
          <a href="#" className="align-middle">
            <IconButton
              icon={faPlus}
              baseColor="#90A4AE"
              hoverColor="#CFD8DC"
              size="2x"
              onClick={this.props.addTeam}
            />
          </a>
        </Row>

        {/* footer component */}
        <Row className="py-4 pl-5">
          <Button
            onClick={() => this.props.resetTeams(this.props.teamsNoEdit)}
            className="mr-5 mb-2 mb-md-0"
            style={{ fontSize: '1.3em' }}
          >
            <FontAwesomeIcon icon={faUndo} size="1x" />{' '}
            <FormattedMessage {...messages.undo} />
          </Button>

          <Button
            onClick={() => this.props.submitTeams(this.props.teams)}
            style={{ fontSize: '1.3em' }}
          >
            <FontAwesomeIcon icon={faSave} size="1x" />{' '}
            <FormattedMessage {...messages.save} />
          </Button>
        </Row>
      </Fragment>
    );
  }
}

TeamEditingContainer.propTypes = {
  // current existing teams
  teamsNoEdit: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]).isRequired,
  // teams to edit
  teams: PropTypes.any.isRequired,
  // function to save teams
  submitTeams: PropTypes.func.isRequired,
  // function to reset teams
  resetTeams: PropTypes.func.isRequired,
  // function to add new team
  addTeam: PropTypes.func.isRequired,
  // function to delete team
  deleteTeamFunc: PropTypes.func.isRequired,
  // function to edit team informations
  onChangeFunc: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  teamsNoEdit: makeSelectTeams(),
  teams: makeSelectTeamContainerTeams(),
});

function mapDispatchToProps(dispatch) {
  return {
    onChangeFunc: (index, field, newValue) =>
      dispatch(setTeamValue(index, field, newValue)),
    deleteTeamFunc: index => dispatch(deleteTeam(index)),
    addTeam: () => dispatch(addNewTeam()),
    resetTeams: teamsNoEdit => dispatch(setTeams(teamsNoEdit)),
    submitTeams: teams => dispatch(saveTeams(teams)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'teamEditingContainer', reducer });

export default compose(
  withReducer,
  withConnect,
)(TeamEditingContainer);
