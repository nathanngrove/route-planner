import React, { useMemo, useCallback, useState } from "react";
import { GoogleMap, Marker, DirectionsRenderer } from "@react-google-maps/api";
import { useCurrentLocation } from "../../context/CurrentLocationProvider";
import { useAddresses } from "../../context/AddressesProvider";
import { useRoutes } from "../../context/RoutesProvider";

export type LatLngLiteral = google.maps.LatLngLiteral;
type MapOptions = google.maps.MapOptions;

type MapProps = {
	mapRef: React.MutableRefObject<GoogleMap | undefined>;
	fullPanel: boolean;
};

const Map = ({ mapRef, fullPanel }: MapProps) => {
	const { addresses } = useAddresses();
	const { routes } = useRoutes();
	const currentLocation = useCurrentLocation();

	const center = useMemo<LatLngLiteral>(
		() => ({ lat: 34.0549, lng: -118.2426 }),
		[]
	);

	const options = useMemo<MapOptions>(
		() => ({ disableDefaultUI: true, clickableIcons: false }),
		[]
	);

	const onLoad = useCallback((map: any) => (mapRef.current = map), []);

	return (
		<div className={`map ${fullPanel ? "map-min" : "map-max"}`}>
			<GoogleMap
				zoom={10}
				center={currentLocation ? currentLocation : center}
				mapContainerClassName="map-container"
				options={options}
				onLoad={onLoad}>
				{routes &&
					routes.map((route, i) => (
						<DirectionsRenderer
							key={i}
							directions={route}
							options={{}}
						/>
					))}
				{addresses &&
					!routes &&
					addresses.map(({ id, address, latLng }) => (
						<Marker key={id} position={latLng} />
					))}
			</GoogleMap>
		</div>
	);
};

export default Map;
