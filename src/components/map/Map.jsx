import React, { useMemo, useCallback, useRef } from "react";
import {
	GoogleMap,
	Marker,
	DirectionsRenderer
} from "@react-google-maps/api";

const Map = ({mapRef, addresses}) => {
	const center = useMemo(() => ({ lat: 34.0549, lng: -118.2426 }), []);
	const options = useMemo(
		() => ({ disableDefaultUI: true, clickableIcons: false }),
		[]
	);

	const onLoad = useCallback((map) => (mapRef.current = map), []);

	return (
		<GoogleMap
			zoom={10}
			center={center}
			mapContainerClassName="map-container"
			options={options}
			onLoad={onLoad}>
				{addresses && addresses.map(({latLng}, i) => <Marker key={latLng.lat + latLng.lng} position={latLng}/>)}
		</GoogleMap>
	);
};

export default Map;
