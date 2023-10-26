function degreesToRadians(degree: number) {
	return degree * (Math.PI / 180);
}

export default function calculateDistance(
	latLng1: google.maps.LatLngLiteral,
	latLng2: google.maps.LatLngLiteral
) {
	const { lat: lat1, lng: lng1 } = latLng1;
	const { lat: lat2, lng: lng2 } = latLng2;

	const lat1Rad = degreesToRadians(lat1);
	const lng1Rad = degreesToRadians(lng1);
	const lat2Rad = degreesToRadians(lat2);
	const lng2Rad = degreesToRadians(lng2);

	const radiusOfEarthInMiles: number = 3958.8;

	return (
		Math.acos(
			Math.sin(lat1Rad) * Math.sin(lat2Rad) +
				Math.cos(lat1Rad) *
					Math.cos(lat2Rad) *
					Math.cos(lng2Rad - lng1Rad)
		) * radiusOfEarthInMiles
	);
}
