/**
 *
 * List
 *
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Nav } from 'reactstrap';
import ListItem from 'components/ListItem/Loadable';
import TransportComponent from 'components/TransportComponent/Loadable';
import TripListItem from 'containers/TripListItem/Loadable';

function List({ items, component, isListOfTrip }) {
  // eslint-disable-next-line prefer-destructuring
  let itemsToDisplay = items;
  const ComponentToRender = component;
  let content = <div />;

  // If we have items, render them
  if (items) {
    if (!isListOfTrip) {
      itemsToDisplay = items.steps;
    }

    content = itemsToDisplay.map(item => (
      <Fragment key={`div-${item._id}`}>
        <ListItem
          key={`item-${item._id}`}
          item={item}
          isListOfTrip={isListOfTrip}
          component={TripListItem}
        />
        {!isListOfTrip &&
          item.transportations.length > 0 && (
          <ListItem
            key={`transport-${item._id}`}
            component={() => (
              <TransportComponent transports={item.transportations} />
            )}
          />
        )}
      </Fragment>
    ));
  } else {
    content = <ListItem component={ComponentToRender} />;
  }

  return (
    <Nav
      className="mx-auto d-flex flex-row"
      vertical
      navbar
      style={{ paddingLeft: 0 }}
    >
      {content}
    </Nav>
  );
}

List.propTypes = {
  // component to render
  component: PropTypes.func.isRequired,
  // items to render
  items: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  // if items are trips
  isListOfTrip: PropTypes.bool,
};

export default List;
