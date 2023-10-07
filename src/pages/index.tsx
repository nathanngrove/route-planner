import { useState, useRef } from "react";
import Map from "../components/map/Map";
import Panel from "../components/map/Panel";
import NotificationContainer from "../components/notifications/NotificationContainer";
import Error from "../components/notifications/Error";
import { useNotifications } from "../context/NotificationsProvider";
import { GoogleMap } from "@react-google-maps/api";

export type Address = {
	address: string
	latLng: google.maps.LatLngLiteral
	visited: boolean
}

const Index = () => {
	const mapRef = useRef<GoogleMap>();
	const [addresses, setAddresses] = useState<Array<Address>>([]);

	const notifications = useNotifications();

	console.log(mapRef);

	return (
		<div className="container">
			<NotificationContainer>
				{notifications?.error !== null &&
					notifications?.error.map((err, i) => (
						<Error
							key={i}
							message={err}
						/>
					))}
				{notifications?.info !== null &&
					notifications?.info.map((err, i) => (
						<Error
							key={i}
							message={err}
						/>
					))}
			</NotificationContainer>
			<div className="controls">
				<Panel
					mapRef={mapRef}
					addresses={addresses}
					setAddresses={setAddresses}
				/>
			</div>
			<div className="map">
				<Map
					mapRef={mapRef}
					addresses={addresses}
				/>
			</div>
		</div>
	);
};

export default Index;
