/**
 *
 * RightLinkPopoverComponent
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import IconButton from 'components/IconButton/Loadable';

const PopoverLinkStyle = {
  position: 'absolute',
  width: '50px',
  height: '50px',
  zIndex: '1000',
  backgroundColor: '#546E7A',
  borderRadius: '10% 0 0 10%',
  color: '#90A4AE',
  textAlign: 'center',
  display: 'table',
  lineHeight: '40px',
};

function PopoverLinkComponent({ icon, specificStyle, onClick }) {
  return (
    <a href="#" onClick={onClick}>
      <div style={{ ...PopoverLinkStyle, ...specificStyle }}>
        <IconButton
          icon={icon}
          size="2x"
          specificStyle={{ verticalAlign: 'middle' }}
          baseColor="#78909C"
          hoverColor="#CFD8DC"
        />
      </div>
    </a>
  );
}

PopoverLinkComponent.propTypes = {
  // icon
  icon: PropTypes.any.isRequired,
  // specific style
  specificStyle: PropTypes.any,
  // on click function
  onClick: PropTypes.func.isRequired,
};

export default PopoverLinkComponent;
