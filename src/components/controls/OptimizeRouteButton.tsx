import { useAddresses } from "../../context/AddressesProvider";
import { useRoutes } from "../../context/RoutesProvider";
import { useNotificationsUpdate } from "../../context/NotificationsProvider";
import { Address } from "../../pages";
import { calculateDistance } from "../../utils/mathUtils";
import { LatLngLiteral } from "../map/Map";

export type DistanceObject = {
	toId: string;
	toAddress: string;
	latLng: LatLngLiteral;
	distance: number;
};

function createDistancesMap(addresses: Array<Address>) {
	const distancesMap: Map<string, Array<DistanceObject>> = new Map();
	addresses.forEach((from) => {
		addresses.forEach((to) => {
			if (from.address !== to.address) {
				const distanceEntry: DistanceObject = {
					toId: to.id,
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

	distanceArray.forEach(({ distance, latLng, toAddress, toId }) => {
		if (distance < lowestDistance && visitedMap.get(toAddress) === false) {
			lowestDistance = distance;
			lowestAddress = {
				id: toId,
				address: toAddress,
				latLng: latLng,
			};
		}
	});

	return lowestAddress;
}

function createOptimizedRoute(newAddresses: Address[], addresses: Address[]) {
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

const OptimizeRouteButton = () => {
	const { addresses, setAddresses } = useAddresses();
	const { routes, setRoutes } = useRoutes();
	const updateNotifications = useNotificationsUpdate();

	function optimizeRoute() {
		if (addresses.length <= 1) {
			updateNotifications({
				type: "error",
				message:
					"You have to enter more than one address to optimize a route!",
			});
			return;
		}

		const newAddresses: Address[] = [];
		createOptimizedRoute(newAddresses, addresses);
		console.log(newAddresses);
		setAddresses(newAddresses);
		updateNotifications({ type: "info", message: "Route optimized!" });
	}

	async function fetchAllRoutes() {
		const routes: google.maps.DirectionsResult[] = [];
		await fetchRoutes(routes, 0, 1);
		return routes;
	}

	async function fetchRoutes(
		routes: google.maps.DirectionsResult[],
		originIndex: number,
		destinationIndex: number
	) {
		if (destinationIndex === addresses.length) return routes;

		const service = new google.maps.DirectionsService();

		await service.route(
			{
				destination: addresses[destinationIndex].latLng,
				origin: addresses[originIndex].latLng,
				travelMode: google.maps.TravelMode.DRIVING,
			},
			(result, status) => {
				if (status === "OK" && result) {
					routes.push(result);
					fetchRoutes(routes, originIndex + 1, destinationIndex + 1);
				}
			}
		);
	}

	async function handleClick() {
		optimizeRoute();
		const routes = await fetchAllRoutes();
		setRoutes(routes);
	}

	return (
		<button className="optimize-button" onClick={() => handleClick()}>
			Optimize My Route
		</button>
	);
};

export default OptimizeRouteButton;
