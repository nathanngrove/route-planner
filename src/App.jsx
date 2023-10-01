import { useLoadScript } from "@react-google-maps/api";
import Index from "./index";

const libraries = ["places"];

function App() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  if (!isLoaded) return <div>Loading...</div>;

  return <Index />;
}

export default App;
