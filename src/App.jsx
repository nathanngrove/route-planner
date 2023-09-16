import { useLoadScript } from "@react-google-maps/api";
import Map from "./components/map";

function App() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  if (!isLoaded) return <div>Loading...</div>;

  return <Map />;
}

export default App;
