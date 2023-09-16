import React, { useState, useMemo, useCallback, useRef } from "react";
import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  MarkerClusterer,
} from "@react-google-maps/api";

const Map = () => {
  const mapRef = useRef();
  const center = useMemo(() => ({ lat: 43, lng: -80 }), []);
  const options = useMemo(
    () => ({ disableDefaultUI: true, clickableIcons: false }),
    []
  );

  const onLoad = useCallback(() => {});

  return (
    <div className="container">
      <div className="controls">Addresses</div>
      <div className="map">
        <GoogleMap
          zoom={10}
          center={center}
          mapContainerClassName="map-container"
          options={options}></GoogleMap>
      </div>
    </div>
  );
};

export default Map;
