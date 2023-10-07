function calculateDistance(latLng1 : google.maps.LatLngLiteral, latLng2: google.maps.LatLngLiteral) {
	const { lat: lat1, lng: lng1 } = latLng1;
	const { lat: lat2, lng: lng2 } = latLng2;
	return (
		Math.acos(
			Math.sin(lat1) * Math.sin(lat2) +
				Math.cos(lat1) * Math.cos(lat2) * Math.cos(lng2 - lng1)
		) * 6371
	);
}

const OptimizeRouteButton = () => {
	return <button className="optimize-button">Optimize My Route</button>;
};

export default OptimizeRouteButton;
