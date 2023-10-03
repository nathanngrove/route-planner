import React, { useState, useRef } from "react";
import Map from "../components/map/Map";
import Panel from "../components/map/Panel";
import NotificationContainer from "../components/notifications/NotificationContainer";
import Error from "../components/notifications/Error";
import { useNotifications } from "../context/NotificationsProvider";

const Index = () => {
	const mapRef = useRef();
	const [addresses, setAddresses] = useState([]);

	const notifications = useNotifications();

	console.log("notif", notifications);

	return (
		<div className="container">
			<NotificationContainer>
				{notifications.error !== undefined &&
					notifications.error.map((err, i) => (
						<Error
							key={i}
							message={err}
						/>
					))}
				{notifications.info !== undefined &&
					notifications.info.map((err) => (
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
