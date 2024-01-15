import { useState, useRef, useEffect } from "react";
import Map, { LatLngLiteral } from "../components/map/Map";
import Panel from "../components/map/Panel";
import NotificationContainer from "../components/notifications/NotificationContainer";
import { GoogleMap } from "@react-google-maps/api";
import {
	useCurrentLocation,
	useUpdateCurrentLocation,
} from "../context/CurrentLocationProvider";
import { getGeocode } from "use-places-autocomplete";

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
	const currentLocation = useCurrentLocation();

	const getAddressFromLatLng = async (latLng: LatLngLiteral) => {
		const result = await getGeocode({
			location: { lat: latLng.lat, lng: latLng.lng },
		});

		const address: string = result[0]["formatted_address"];

		return address;
	};

	useEffect(() => {
		if (currentLocation !== null) {
			const formattedAddress = getAddressFromLatLng(currentLocation).then(
				(address) => {
					setAddresses([
						{
							address: address,
							latLng: currentLocation,
						},
					]);
				}
			);
		}
	}, [currentLocation]);

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
