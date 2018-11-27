/**
 *
 * ImgListItem
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { ADDRESS_SERVER_PHOTO } from '../../constants';
import IconButton from '../IconButton/Loadable';

/* eslint-disable react/prefer-stateless-function */
const imgStyleBase = {
  width: '100%',
  height: '100%',
  display: 'block',
  marginLeft: 'auto',
  marginRight: 'auto',
  border: '1px solid #455A64',
};

const hoverImgOnStyle = {
  opacity: 0.5,
};

const spanStyleBase = {
  position: 'absolute',
  bottom: '0.6em',
  left: '0.6em',
};

const spanTrashStyleBase = {
  position: 'absolute',
  top: '0.5em',
  right: '1em',
};

const spanEditStyleBase = {
  position: 'absolute',
  top: '0.5em',
  right: '2.6em',
};

const hoverSpanOnStyle = {
  visibility: 'visible',
};

const hoverSpanOffStyle = {
  visibility: 'hidden',
};

export class ImgListItem extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { hover: false };
  }

  hoverOn = () => {
    this.setState({ hover: true });
  };

  hoverOff = () => {
    this.setState({ hover: false });
  };

  // get image style
  getImgStyle() {
    if (this.state.hover) {
      return { ...hoverImgOnStyle, ...imgStyleBase };
    }
    return { ...imgStyleBase };
  }

  // get name span style
  getSpanNameStyle() {
    if (this.state.hover) {
      return { ...hoverSpanOnStyle, ...spanStyleBase };
    }
    return { ...hoverSpanOffStyle, ...spanStyleBase };
  }

  // get trash icon style
  getSpanTrashStyle() {
    if (this.state.hover) {
      return { ...hoverSpanOnStyle, ...spanTrashStyleBase };
    }
    return { ...hoverSpanOffStyle, ...spanTrashStyleBase };
  }

  // get edit icon style
  getSpanEditStyle() {
    if (this.state.hover) {
      return { ...hoverSpanOnStyle, ...spanEditStyleBase };
    }
    return { ...hoverSpanOffStyle, ...spanEditStyleBase };
  }

  render() {
    let url = ADDRESS_SERVER_PHOTO;

    // if item is a trip
    if (this.props.isListOfTrip) {
      url += this.props.item.photoInOne;
      // if item is a step & contains substeps
    } else if (this.props.item.substeps.length > 0) {
      url += this.props.item.substeps[0].photoMin;
      // no image to render
    } else {
      url += 'notFound';
    }

    return (
      <div>
        <img
          src={url}
          alt={this.props.item.name}
          style={this.getImgStyle()}
          onClick={this.props.onClick}
          onMouseEnter={this.hoverOn}
          onMouseLeave={this.hoverOff}
        />
        <span onMouseEnter={this.hoverOn} style={this.getSpanNameStyle()}>
          {this.props.item.name}
        </span>
        <span onMouseEnter={this.hoverOn} style={this.getSpanTrashStyle()}>
          {this.props.isListOfTrip && (
            <IconButton
              icon={faTrashAlt}
              size="lg"
              onClick={this.props.onDeleteClick}
            />
          )}
        </span>
        <span onMouseEnter={this.hoverOn} style={this.getSpanEditStyle()}>
          <IconButton
            icon={faEdit}
            size="lg"
            onClick={this.props.onEditClick}
          />
        </span>
      </div>
    );
  }
}

ImgListItem.propTypes = {
  // the item to display
  item: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]).isRequired,
  // if item is a trip
  isListOfTrip: PropTypes.bool,
  // on click function
  onClick: PropTypes.func,
  // function delete
  onDeleteClick: PropTypes.func,
  // function edit
  onEditClick: PropTypes.func,
};

export default ImgListItem;
