import React, { useState, useContext, useEffect } from "react";
import { LatLngLiteral } from "../components/map/Map";
import { useNotificationsUpdate } from "./NotificationsProvider";

const CurrentLocationContext = React.createContext<LatLngLiteral | null>(null);
const UpdateCurrentLocationContext = React.createContext<() => void>(() => {});

export function useCurrentLocation() {
	return useContext(CurrentLocationContext);
}

export function useUpdateCurrentLocation() {
	return useContext(UpdateCurrentLocationContext);
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

	const getCurrentLocation = () => {
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
	};

	return (
		<CurrentLocationContext.Provider value={currentLocation}>
			<UpdateCurrentLocationContext.Provider value={getCurrentLocation}>
				{children}
			</UpdateCurrentLocationContext.Provider>
		</CurrentLocationContext.Provider>
	);
};

export default CurrentLocationProvider;
