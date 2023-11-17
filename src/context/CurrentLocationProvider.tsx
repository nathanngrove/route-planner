import React, { useState, useContext, useEffect } from "react";
import { LatLngLiteral } from "../components/map/Map";
import { useNotificationsUpdate } from "./NotificationsProvider";

const CurrentLocationContext = React.createContext<LatLngLiteral | null>(null);

export function useCurrentLocation() {
	return useContext(CurrentLocationContext);
}

type CurrentLocationProviderProps = {
	children: React.ReactNode;
};

const CurrentLocationProvider = ({
	children,
}: CurrentLocationProviderProps) => {
	const [currentLocation, setCurrentLocation] =
		useState<LatLngLiteral | null>(null);
	const updateNotifications = useNotificationsUpdate();

	useEffect(() => {
		navigator.geolocation.getCurrentPosition(
			(success) => {
				setCurrentLocation({
					lat: success.coords.latitude,
					lng: success.coords.longitude,
				});
				console.log(currentLocation);
			},
			(error) =>
				updateNotifications("error", error.code + ": " + error.message),
			{ enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
		);
	}, []);

	return (
		<CurrentLocationContext.Provider value={currentLocation}>
			{children}
		</CurrentLocationContext.Provider>
	);
};

export default CurrentLocationProvider;
