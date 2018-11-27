/**
 *
 * Map
 *
 */

import React from 'react';
import 'ol/ol.css';
import { Feature, Map, View } from 'ol';
import { Point } from 'ol/geom';
import { Cluster, OSM, Vector as VectorSource } from 'ol/source';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import * as extent from 'ol/extent';
import { Circle as CircleStyle, Fill, Stroke, Style, Text } from 'ol/style';
import * as proj from 'ol/proj';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  makeSelectItemsToDisplayOnMap,
  makeSelectCurrentItemMapPage,
} from 'containers/MapPage/selectors';
import { makeSelectTeams } from 'containers/App/selectors';
import injectReducer from 'utils/injectReducer';

import reducer from './reducer';

/* eslint-disable react/prefer-stateless-function */
class MapContainer extends React.PureComponent {
  constructor(props) {
    super(props);
    this.map = false;
    this.clusters = false;
  }

  /**
   * Create clusters and features
   *
   */
  setClusters() {
    const features = [];
    let featureCache;
    let teamCache = [];

    // creates feature for each item to display on map
    this.props.itemsToDisplayOnMap.forEach(item => {
      featureCache = new Feature(
        new Point(
          proj.transform([item.long, item.lat], 'EPSG:4326', 'EPSG:3857'),
        ),
      );

      // get team if exists
      if (this.props.teams) {
        teamCache = this.props.teams.filter(obj => obj._id === item.team);
      }

      // set style
      featureCache.setStyle(
        new Style({
          image: new CircleStyle({
            radius: 10,
            stroke: new Stroke({
              color: '#E4E4E4',
            }),
            fill: new Fill({
              color: teamCache[0] ? teamCache[0].color : '#CD00FF',
            }),
          }),
          text: new Text({
            text: 1,
            fill: new Fill({
              color: '#fff',
            }),
          }),
        }),
      );

      featureCache.setId(item._id);

      features.push(featureCache);
    });

    const source = new VectorSource({
      features,
    });

    const clusterSource = new Cluster({
      distance: 20,
      source,
    });

    // creates clusters
    this.clusters = new VectorLayer({
      source: clusterSource,
      style(feature) {
        const size = feature.get('features').length;

        const style = new Style({
          text: new Text({
            text: size.toString(),
            fill: new Fill({
              color: '#fff',
            }),
          }),
        });

        // if it's not a cluster
        if (size === 1) {
          style.setImage(
            feature
              .get('features')[0]
              .getStyle()
              .getImage(),
          );
        } else {
          style.setImage(
            new CircleStyle({
              radius: 9,
              stroke: new Stroke({
                color: '#E4E4E4',
              }),
              fill: new Fill({
                color: '#37474F',
              }),
            }),
          );
        }
        return style;
      },
    });
  }

  componentDidMount() {
    this.setClusters();

    // constructs tilelayer
    const raster = new TileLayer({
      source: new OSM({
        url: 'https://{a-c}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png',
      }),
    });

    // create map
    this.map = new Map({
      layers: [raster, this.clusters],
      target: 'map',
      view: new View({
        center: [0, 0],
        zoom: 2,
      }),
    });
  }

  componentDidUpdate() {
    this.map.removeLayer(this.clusters);
    this.setClusters();
    this.map.addLayer(this.clusters);
    this.map.updateSize();

    if (
      this.props.currentItem &&
      !this.isOnMap(this.props.currentItem.long, this.props.currentItem.lat)
    ) {
      this.zoomAndValorize(
        this.props.currentItem._id,
        this.props.currentItem.long,
        this.props.currentItem.lat,
      );
    }
  }

  /**
   * Check if marker is currently visible
   *
   * @param long {float}    the longitude
   * @param lat {float}     the latitude
   *
   * @returns {boolean}   representing if marker is visible
   */
  isOnMap(long, lat) {
    const mapExtent = this.map.getView().calculateExtent();
    return extent.containsCoordinate(
      mapExtent,
      proj.transform([long, lat], 'EPSG:4326', 'EPSG:3857'),
    );
  }

  /**
   * Valorize & zoom on a feature
   *
   * @param id {number}   the id feature
   * @param long {float}    the longitude
   * @param lat {float}   the latitude
   */
  zoomAndValorize(id, long, lat) {
    const exists = this.valorize(id);

    if (exists) {
      this.setCenter(long, lat);
    }
  }

  /**
   * Set the map center on given coordinates
   *
   * @param long {float}    the longitude
   * @param lat {float}   the latitude
   */
  setCenter(long, lat) {
    this.map
      .getView()
      .setCenter(proj.transform([long, lat], 'EPSG:4326', 'EPSG:3857'));
    this.map.getView().setZoom(6);
  }

  /**
   * Valorize a feature
   *
   * @param id {number}   the feature id
   *
   * @returns {boolean}     true if feature exists
   */
  valorize(id) {
    const feature = this.clusters
      .getSource()
      .getSource()
      .getFeatureById(id);

    if (feature) {
      feature.getStyle().setImage(
        new CircleStyle({
          radius: 14,
          stroke: new Stroke({
            color: '#3D3D3D',
          }),
          fill: feature
            .getStyle()
            .getImage()
            .getFill(),
        }),
      );
      return true;
    }
    return false;
  }

  render() {
    return (
      <div id="map" style={{ width: '100%', height: '100%' }} className="map" />
    );
  }
}

MapContainer.propTypes = {
  // items array to display on map
  itemsToDisplayOnMap: PropTypes.oneOfType([PropTypes.array, PropTypes.bool])
    .isRequired,
  // existing teams array
  teams: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]).isRequired,
  // current item
  currentItem: PropTypes.oneOfType([PropTypes.any, PropTypes.bool]),
};

export function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const mapStateToProps = createStructuredSelector({
  itemsToDisplayOnMap: makeSelectItemsToDisplayOnMap(),
  teams: makeSelectTeams(),
  currentItem: makeSelectCurrentItemMapPage(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'mapContainer', reducer });

export default compose(
  withReducer,
  withConnect,
)(MapContainer);
