import { useState, useRef, useEffect } from "react";
import Map, { LatLngLiteral } from "../components/map/Map";
import Panel from "../components/map/Panel";
import NotificationContainer from "../components/notifications/NotificationContainer";
import { GoogleMap } from "@react-google-maps/api";
import { useCurrentLocation } from "../context/CurrentLocationProvider";

export type Address = {
	address: string;
	latLng: LatLngLiteral;
};

export type DistanceObject = {
	toAddress: string;
	latLng: LatLngLiteral;
	distance: number;
};

const Index = () => {
	const mapRef = useRef<GoogleMap>();
	const [addresses, setAddresses] = useState<Array<Address>>([]);
	const [fullPanel, setFullPanel] = useState(false);

	// const currentLocation = useCurrentLocation();

	// useEffect(() => {
	// 	if (currentLocation !== null) {
	// 		setAddresses([
	// 			{ address: "Current Location", latLng: currentLocation },
	// 		]);
	// 	}
	// }, [currentLocation]);

	return (
		<div className="container">
			<NotificationContainer />
			<Panel
				mapRef={mapRef}
				addresses={addresses}
				setAddresses={setAddresses}
				fullPanel={fullPanel}
				setFullPanel={setFullPanel}
			/>
			<Map mapRef={mapRef} addresses={addresses} fullPanel={fullPanel} />
		</div>
	);
};

export default Index;
