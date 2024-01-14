import { Address } from "../pages";

function degreesToRadians(degree: number) {
	return degree * (Math.PI / 180);
}

export function calculateDistance(
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

export function getCenterOfCoords(addresses: Array<Address>) {
	if (addresses.length === 1) return addresses[0].latLng;

	let center = { lat: 0, lng: 0 };

	addresses.forEach(({ address, latLng }) => {
		const { lat, lng } = latLng;

		center.lat += lat;
		center.lng += lng;
	});

	center.lat = center.lat / addresses.length;
	center.lng = center.lng / addresses.length;

	return center;
}
