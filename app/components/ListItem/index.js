/**
 *
 * ListItem
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { NavItem } from 'reactstrap';

function ListItem(props) {
  const ComponentToRender = props.component;
  let content = <div />;

  if (props.item) {
    content = (
      <ComponentToRender item={props.item} isListOfTrip={props.isListOfTrip} />
    );
  } else {
    content = <ComponentToRender />;
  }

  return <NavItem>{content}</NavItem>;
}

ListItem.propTypes = {
  // component to render
  component: PropTypes.func.isRequired,
  // if item is a trip
  isListOfTrip: PropTypes.bool,
  // item to render
  item: PropTypes.any,
};

export default ListItem;
