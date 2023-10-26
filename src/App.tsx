import { LoadScriptProps, useLoadScript } from "@react-google-maps/api";
import Index from "./pages/index";
import NotificationsProvider from "./context/NotificationsProvider";
import CurrentLocationProvider from "./context/CurrentLocationProvider";

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
				<Index />
			</CurrentLocationProvider>
		</NotificationsProvider>
	);
}

export default App;
