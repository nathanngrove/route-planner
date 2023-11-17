import React, { useMemo, useCallback } from "react";
import { GoogleMap, Marker, DirectionsRenderer } from "@react-google-maps/api";
import { Address } from "../../pages";
import { useCurrentLocation } from "../../context/CurrentLocationProvider";

export type LatLngLiteral = google.maps.LatLngLiteral;
type DirectionsResult = google.maps.DirectionsResult;
type MapOptions = google.maps.MapOptions;

type MapProps = {
	mapRef: React.MutableRefObject<GoogleMap | undefined>;
	addresses: Array<Address>;
	fullPanel: boolean;
};

const Map = ({ mapRef, addresses, fullPanel }: MapProps) => {
	const center = useMemo<LatLngLiteral>(
		() => ({ lat: 34.0549, lng: -118.2426 }),
		[]
	);
	const options = useMemo<MapOptions>(
		() => ({ disableDefaultUI: true, clickableIcons: false }),
		[]
	);

	const currentLocation = useCurrentLocation();

	const onLoad = useCallback((map: any) => (mapRef.current = map), []);

	return (
		<div className={`map ${fullPanel ? "map-min" : "map-max"}`}>
			<GoogleMap
				zoom={10}
				center={currentLocation ? currentLocation : center}
				mapContainerClassName="map-container"
				options={options}
				onLoad={onLoad}>
				{addresses &&
					addresses.map(({ latLng }) => (
						<Marker
							key={latLng.lat + latLng.lng}
							position={latLng}
						/>
					))}
			</GoogleMap>
		</div>
	);
};

export default Map;
