import { LoadScriptProps, useLoadScript } from "@react-google-maps/api";
import Index from "./pages/index";
import NotificationsProvider from "./context/NotificationsProvider";
import CurrentLocationProvider from "./context/CurrentLocationProvider";
import { HTML5toTouch } from "rdndmb-html5-to-touch";
import { DndProvider } from "react-dnd-multi-backend";

const libraries: LoadScriptProps["libraries"] = ["places"];

function App() {
	const { isLoaded } = useLoadScript({
		googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
		libraries,
	});

	if (!isLoaded) return <div>Loading...</div>;

	return (
		<NotificationsProvider>
			<CurrentLocationProvider>
				<DndProvider options={HTML5toTouch}>
					<Index />
				</DndProvider>
			</CurrentLocationProvider>
		</NotificationsProvider>
	);
}

export default App;
