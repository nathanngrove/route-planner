import { Address, DistanceObject } from "../../pages";

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

function createGraph(addresses: Array<Address>) {
	
}

function optimizeRoute(addresses: Array<Address>) {
	const newAddresses = [...addresses];
	//calculate distance for every possibility
	newAddresses.forEach(from => {
		newAddresses.forEach(to => {
			if(from.address !== to.address) {
				const distanceEntry: DistanceObject = {
					from: from.address,
					to: to.address,
					distance: calculateDistance(from.latLng, to.latLng)
				};

				from.distances.push(distanceEntry);
			}
		});
	});
	console.log(newAddresses);
	//create graph
	//run pathfinding algo
	//return optimized route
}

type OptimizeRouteButtonProps = {
	addresses: Array<Address>
}

const OptimizeRouteButton = ({addresses} : OptimizeRouteButtonProps) => {
	return <button className="optimize-button" onClick={()=>optimizeRoute(addresses)}>Optimize My Route</button>;
};

export default OptimizeRouteButton;
