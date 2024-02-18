import Index from "./pages/index";
import { LoadScriptProps, useLoadScript } from "@react-google-maps/api";
import NotificationsProvider from "./context/NotificationsProvider";
import CurrentLocationProvider from "./context/CurrentLocationProvider";
import AddressesProvider from "./context/AddressesProvider";
import { HTML5toTouch } from "rdndmb-html5-to-touch";
import { DndProvider } from "react-dnd-multi-backend";
import RoutesProvider from "./context/RoutesProvider";

const libraries: LoadScriptProps["libraries"] = ["places"];

function App() {
	const { isLoaded } = useLoadScript({
		googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
		libraries,
	});

	if (!isLoaded) return <div>Loading...</div>;

	return (
		<NotificationsProvider>
			<RoutesProvider>
				<AddressesProvider>
					<CurrentLocationProvider>
						<DndProvider options={HTML5toTouch}>
							<Index />
						</DndProvider>
					</CurrentLocationProvider>
				</AddressesProvider>
			</RoutesProvider>
		</NotificationsProvider>
	);
}

export default App;
