import React, { useState, useContext } from "react";

type RoutesResult = google.maps.DirectionsResult;

type RoutesContextObject = {
	routes: RoutesResult[];
	setRoutes: React.Dispatch<React.SetStateAction<RoutesResult[]>>;
};

const RoutesContext = React.createContext<RoutesContextObject>({
	routes: [],
	setRoutes: () => {},
});

export function useRoutes() {
	return useContext(RoutesContext);
}

type RoutesProviderProps = {
	children: React.ReactNode;
};

const RoutesProvider = ({ children }: RoutesProviderProps) => {
	const [routes, setRoutes] = useState<RoutesResult[]>([]);

	const routesObject = {
		routes: routes,
		setRoutes: setRoutes,
	};

	return (
		<RoutesContext.Provider value={routesObject}>
			{children}
		</RoutesContext.Provider>
	);
};

export default RoutesProvider;
