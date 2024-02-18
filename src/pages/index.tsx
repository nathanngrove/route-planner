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
import { useAddresses } from "../context/AddressesProvider";

export type Address = {
	id: string;
	address: string;
	latLng: LatLngLiteral;
};

const Index = () => {
	const mapRef = useRef<GoogleMap>();
	const [fullPanel, setFullPanel] = useState(false);

	const { setAddresses } = useAddresses();
	const currentLocation = useCurrentLocation();

	const getAddressFromLatLng = async (
		latLng: LatLngLiteral
	): Promise<Address> => {
		const result = await getGeocode({
			location: { lat: latLng.lat, lng: latLng.lng },
		});
		const address: string = result[0].formatted_address;

		return { id: result[0].place_id, address: address, latLng: latLng };
	};

	useEffect(() => {
		if (currentLocation !== null) {
			const formattedAddress = getAddressFromLatLng(currentLocation).then(
				(currentAddress) => {
					setAddresses([currentAddress]);
				}
			);
		}
	}, [currentLocation]);

	return (
		<div className="container">
			<NotificationContainer />
			<Panel
				mapRef={mapRef}
				fullPanel={fullPanel}
				setFullPanel={setFullPanel}
			/>
			<Map mapRef={mapRef} fullPanel={fullPanel} />
		</div>
	);
};

export default Index;
