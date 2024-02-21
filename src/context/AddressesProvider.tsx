import React, { useState, useContext } from "react";
import { Address } from "../pages";

type AddressesContextObject = {
	addresses: Address[];
	setAddresses: (addresses: Address[]) => void;
};

const AddressesContext = React.createContext<AddressesContextObject>({
	addresses: [],
	setAddresses: () => {},
});

export function useAddresses() {
	return useContext(AddressesContext);
}

type AddressesProviderProps = {
	children: React.ReactNode;
};

const AddressesProvider = ({ children }: AddressesProviderProps) => {
	const initalAddresses = window.localStorage.getItem("addresses")
		? JSON.parse(window.localStorage.getItem("addresses") as string)
		: [];

	const [addresses, setAddresses] = useState<Address[]>(initalAddresses);

	function set(addresses: Address[]) {
		window.localStorage.setItem("addresses", JSON.stringify(addresses));
		setAddresses(addresses);
	}

	const addressesObject = {
		addresses: addresses,
		setAddresses: set,
	};

	return (
		<AddressesContext.Provider value={addressesObject}>
			{children}
		</AddressesContext.Provider>
	);
};

export default AddressesProvider;
