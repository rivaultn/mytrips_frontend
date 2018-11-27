/**
 *
 * NavBarItem
 *
 */

import React from 'react';
import { NavItem, NavLink } from 'reactstrap';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import IconButton from '../IconButton/Loadable';

const linkStyle = {
  fontWeight: 'bold',
  textShadow: '1px 1px 1px rgba(0,0,0,0.2)',
};

function NavBarItem({ icon, message, href, onClick, secondary }) {
  return (
    <NavItem className="px-lg-0">
      <NavLink
        href={href}
        style={{ ...linkStyle, backgroundColor: secondary ? '#039BE5' : '' }}
        className="px-2"
        onClick={onClick}
      >
        <IconButton
          icon={icon}
          size="1x"
          specificStyle={{ marginRight: '20px' }}
        />
        <FormattedMessage {...message} />
      </NavLink>
    </NavItem>
  );
}

NavBarItem.propTypes = {
  // icon
  icon: PropTypes.any.isRequired,
  // message
  message: PropTypes.any,
  // href link
  href: PropTypes.string.isRequired,
  // on click function
  onClick: PropTypes.func.isRequired,
  // if it's a secondary link
  secondary: PropTypes.bool,
};

export default NavBarItem;
