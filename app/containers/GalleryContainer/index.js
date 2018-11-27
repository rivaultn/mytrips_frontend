/**
 *
 * GalleryContainer
 *
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import 'react-image-gallery/styles/css/image-gallery.css';
import { faInfo } from '@fortawesome/free-solid-svg-icons';
import injectReducer from 'utils/injectReducer';
import { Col } from 'reactstrap';
import ImageGallery from 'react-image-gallery';
import RightPopoverComponent from 'components/PopoverComponent/PopoverContainerComponent/Loadable';
import RightLinkPopoverComponent from 'components/PopoverComponent/PopoverLinkComponent/Loadable';
import EditableSpan from 'components/EditableSpan/Loadable';
import CloseablePopover from 'components/CloseablePopover/Loadable';
import SubstepEditingContainer from '../SubstepEditingContainer/Loadable';
import {
  makeSelectDisplayComment,
  makeSelectCurrentItemMapPage,
} from '../MapPage/selectors';
import reducer from './reducer';
import {
  displayComment,
  changeCurrentItem,
  editSubstep,
} from '../MapPage/actions';
import './galleryComponent.css';
import { loadJS } from '../App';
import messages from './messages';
import { API_KEY } from '../../constants';
/* eslint-disable react/prefer-stateless-function */
export class GalleryContainer extends React.PureComponent {
  constructor(props) {
    super(props);
    this.imageGallery = React.createRef();
  }

  componentDidMount() {
    loadJS(
      `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=places`,
      'mapsApi',
    );
  }

  componentDidUpdate(prevProps) {
    if (prevProps.photosToDisplay !== this.props.photosToDisplay) {
      this.imageGallery.current.slideToIndex(0);
    }
  }

  render() {
    return (
      <Fragment>
        <Col
          className={`col-12 col-xl-${this.props.displayComment ? '9' : '12'}`}
          style={{
            maxHeight: '100%',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          {/* gallery */}
          <ImageGallery
            ref={this.imageGallery}
            items={this.props.photosToDisplay}
            onImageLoad={() =>
              this.props.onChangeCurrentItem(
                this.imageGallery.current.getCurrentIndex(),
              )
            }
          />

          {/* informations component popover link */}
          {!this.props.displayComment && (
            <div className="d-none d-xl-block">
              <RightLinkPopoverComponent
                icon={faInfo}
                specificStyle={{ right: 0, top: 0 }}
                onClick={this.props.clickDisplayComment}
              />
            </div>
          )}
        </Col>
        <Col
          className={`colComment col-12 ${
            this.props.displayComment ? 'col-xl-3' : 'col-12 hideComment'
          }`}
          style={{ backgroundColor: '#546E7A', padding: '0 0 0 0' }}
        >
          {/* informations component content */}
          <RightPopoverComponent
            componentToDisplay={
              <CloseablePopover
                onClick={this.props.clickDisplayComment}
                componentTitle={
                  <EditableSpan
                    initialValue={this.props.currentItem.name}
                    field="name"
                    defaultValue={messages.name.defaultMessage}
                    style={{ display: 'inline-block', fontSize: '1.2em' }}
                    onChangeFunc={returnValue =>
                      this.props.onChangeFunc(
                        returnValue.field,
                        returnValue.value,
                      )
                    }
                  />
                }
                componentToDisplay={
                  <SubstepEditingContainer
                    currentItem={this.props.currentItem}
                  />
                }
              />
            }
          />
        </Col>
      </Fragment>
    );
  }
}

GalleryContainer.propTypes = {
  // photos to display on gallery
  photosToDisplay: PropTypes.array.isRequired,
  // if photos informations should be displayed
  displayComment: PropTypes.bool.isRequired,
  // current item displayed on informations component & gallery photo
  currentItem: PropTypes.any.isRequired,
  // on change current item function
  onChangeCurrentItem: PropTypes.func.isRequired,
  // on click to display photos informations
  clickDisplayComment: PropTypes.func.isRequired,
  // on edit item informations
  onChangeFunc: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  displayComment: makeSelectDisplayComment(),
  currentItem: makeSelectCurrentItemMapPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    // display photo informations
    clickDisplayComment: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(displayComment());
    },
    onChangeCurrentItem: index => dispatch(changeCurrentItem(index)),
    onChangeFunc: (field, newValue) => dispatch(editSubstep(field, newValue)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'galleryContainer', reducer });

export default compose(
  withReducer,
  withConnect,
)(GalleryContainer);
