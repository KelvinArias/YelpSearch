"use client";
import React from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import PropTypes from "prop-types";

/**
 * Map component for displaying a Google Map with a marker at a specific location.
 *
 * @component
 * @param {number} latitude - The latitude of the location to be marked on the map.
 * @param {number} longitude - The longitude of the location to be marked on the map.
 * @param {String} googleAPI - Google API key
 * @returns {JSX.Element|null} Returns the Map component JSX or null if the Google Maps API is not loaded.
 */
const Map = ({ latitude, longitude, googleAPI }) => {
  const { isLoaded } = useJsApiLoader({
    id: "d24e27d5c81cb08f",
    googleMapsApiKey: googleAPI,
  });

  const mapContainerStyle = {
    width: "100%",
    height: "400px",
  };

  const center = {
    lat: latitude,
    lng: longitude,
  };

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={center}
      options={{ mapTypeControl: false, disableDefaultUI: true }}
      zoom={14}
    >
      <Marker position={center} />
    </GoogleMap>
  ) : (
    <div style={mapContainerStyle} />
  );
};

Map.propTypes = {
  latitude: PropTypes.number.isRequired,
  longitude: PropTypes.number.isRequired,
};

export default Map;
