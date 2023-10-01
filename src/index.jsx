import React, { useState, useRef } from "react";
import Map from "./components/map/Map";
import Panel from "./components/map/Panel";
import NotificationContainer from "./components/notifications/NotificationContainer";
import Error from "./components/notifications/Error";

const Index = () => {
	const mapRef = useRef();
	const [addresses, setAddresses] = useState([]);
	const [errors, setErrors] = useState([]);

	console.log(addresses);

	return (
		<div className="container">
			<NotificationContainer>
				{errors.map((error) => {
					<Error message={error} />;
				})}
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
