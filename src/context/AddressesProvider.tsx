import React, { useState, useContext } from "react";
import { Address } from "../pages";

type AddressesContextObject = {
	addresses: Address[];
	setAddresses: React.Dispatch<React.SetStateAction<Address[]>>;
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
	const [addresses, setAddresses] = useState<Address[]>([]);

	const addressesObject = {
		addresses: addresses,
		setAddresses: setAddresses,
	};

	return (
		<AddressesContext.Provider value={addressesObject}>
			{children}
		</AddressesContext.Provider>
	);
};

export default AddressesProvider;
