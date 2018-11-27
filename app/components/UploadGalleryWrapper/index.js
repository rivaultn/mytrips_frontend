/**
 *
 * GalleryWrapper
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import FineUploaderTraditional from 'fine-uploader-wrappers';
import { FormattedMessage } from 'react-intl';
import 'react-fine-uploader/gallery/gallery.css';
import Gallery from 'react-fine-uploader';
import {
  ADDRESS_SERVER_PHOTO,
  ADDRESS_SERVER_PHOTO_UPLOADS,
} from '../../constants';
import messages from './messages';

export class GalleryWrapper extends React.PureComponent {
  constructor(props) {
    super(props);
    // existing substeps to display
    this.already_uploaded_list = [];
    // push existing items in the array
    this.props.step.substeps.map((subStep, index) =>
      this.already_uploaded_list.push({
        id: index,
        uuid: subStep.uuid,
        name: subStep.name,
        thumbnailUrl: `${ADDRESS_SERVER_PHOTO}${subStep.photoMin}`,
      }),
    );

    this.state = {
      uploader: new FineUploaderTraditional({
        options: {
          chunking: {
            enabled: true,
          },
          deleteFile: {
            // enabled: true,
            enabled: false,
            forceConfirm: true,
            endpoint: `${ADDRESS_SERVER_PHOTO_UPLOADS}${this.props.step._id}`,
          },
          request: {
            endpoint: `${ADDRESS_SERVER_PHOTO_UPLOADS}`,
            params: {
              stepId: this.props.step._id,
            },
          },
          retry: {
            enableAuto: true,
          },
        },
      }),

      already_uploaded_list: this.already_uploaded_list,
    };
  }

  componentDidMount() {
    // if steps contains existing substeps, render them
    if (this.state.already_uploaded_list.length > 0) {
      this.state.uploader.methods.addInitialFiles(
        this.state.already_uploaded_list,
      );
    }

    // on complete upload call saga action to update state
    this.state.uploader.on('complete', (id, name, response) => {
      this.props.addSubstep(
        this.props.currentIndexEditingItem,
        name,
        `${name.substr(0, name.lastIndexOf('.'))}-min${name.substr(
          name.lastIndexOf('.'),
          name.length,
        )}`,
        response.uuid[0],
        response.date,
        response.GPSLongitude,
        response.GPSLatitude,
      );
    });

    // on delete complete, actualize state
    this.state.uploader.on('deleteComplete', (id, xhr, isError) => {
      const uuid = xhr.response;

      if (!isError) {
        this.props.deleteSubstep(this.props.currentIndexEditingItem, uuid);
      }
    });
  }

  render() {
    return (
      <Gallery
        fileInput-children={<FormattedMessage {...messages.uploadButton} />}
        uploader={this.state.uploader}
      />
    );
  }
}

GalleryWrapper.propTypes = {
  // current step
  step: PropTypes.any.isRequired,
  // current index
  currentIndexEditingItem: PropTypes.number.isRequired,
  // add substep function
  addSubstep: PropTypes.func.isRequired,
  // delete substep function
  deleteSubstep: PropTypes.func.isRequired,
};

export default GalleryWrapper;
