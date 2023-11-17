import { useNotificationsUpdate } from "../../context/NotificationsProvider";
import { Address, DistanceObject } from "../../pages";
import calculateDistance from "../../utils/calculateDistance";

function createDistancesMap(addresses: Array<Address>) {
	const distancesMap: Map<string, Array<DistanceObject>> = new Map();
	addresses.forEach((from) => {
		addresses.forEach((to) => {
			if (from.address !== to.address) {
				const distanceEntry: DistanceObject = {
					toAddress: to.address,
					latLng: to.latLng,
					distance: calculateDistance(from.latLng, to.latLng),
				};

				const previousDistances = distancesMap.get(from.address);
				if (previousDistances === undefined) {
					distancesMap.set(from.address, [distanceEntry]);
				} else {
					distancesMap.get(from.address)?.push(distanceEntry);
				}
			}
		});
	});
	return distancesMap;
}

function createVisitedMap(addresses: Array<Address>) {
	const visitedMap: Map<string, boolean> = new Map();
	addresses.forEach((address) => {
		visitedMap.set(address.address, false);
	});
	return visitedMap;
}

function getShortestDistance(
	distanceArray: Array<DistanceObject>,
	visitedMap: Map<string, boolean>
): Address | null {
	let lowestDistance = Number.POSITIVE_INFINITY;
	let lowestAddress: Address | null = null;

	distanceArray.forEach(({ distance, latLng, toAddress }) => {
		if (distance < lowestDistance && visitedMap.get(toAddress) === false) {
			lowestDistance = distance;
			lowestAddress = { address: toAddress, latLng: latLng };
		}
	});

	return lowestAddress;
}

function createOptimizedRoute(
	newAddresses: Array<Address>,
	addresses: Array<Address>
) {
	const distancesMap = createDistancesMap(addresses);
	const visitedMap = createVisitedMap(addresses);
	let currentAddress: Address | null = addresses[0];
	let nextAddress: Address | null = null;

	while (currentAddress !== null) {
		nextAddress = getShortestDistance(
			distancesMap.get(currentAddress!.address)!,
			visitedMap
		);
		newAddresses.push(currentAddress!);
		visitedMap.set(currentAddress!.address, true);
		currentAddress = nextAddress;
	}

	return newAddresses;
}

type OptimizeRouteButtonProps = {
	addresses: Array<Address>;
	setAddresses: (addresses: Array<Address>) => void;
};

const OptimizeRouteButton = ({
	addresses,
	setAddresses,
}: OptimizeRouteButtonProps) => {
	const updateNotifications = useNotificationsUpdate();

	function optimizeRoute() {
		if (addresses.length <= 1) {
			updateNotifications(
				"error",
				"You have to enter more than one address to optimize a route!"
			);
			return;
		}

		const newAddresses: Array<Address> = [];
		createOptimizedRoute(newAddresses, addresses);
		console.log(newAddresses);
		setAddresses(newAddresses);
		updateNotifications("info", "Route optimized!");
	}

	return (
		<button className="optimize-button" onClick={() => optimizeRoute()}>
			Optimize My Route
		</button>
	);
};

export default OptimizeRouteButton;
