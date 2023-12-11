import React from "react";
import { useUpdateCurrentLocation } from "../../context/CurrentLocationProvider";

const InfoBox = () => {
	const updateCurrentLocation = useUpdateCurrentLocation();

	return (
		<div className="info-box">
			<img src="https://placehold.co/50x75" alt="" />
			<div>
				<p>
					Enter a starting address above. Alternatively, you can use
					your current location by pressing the button below.
				</p>
				<br />
				<button
					className="use-location-button"
					onClick={() => updateCurrentLocation()}>
					Use Current Location
				</button>
			</div>
		</div>
	);
};

export default InfoBox;
