import { Address } from "../pages";

export const removeAddress = (
	address: string,
	addresses: Address[],
	setAddresses: React.Dispatch<React.SetStateAction<Address[]>>
) => {
	const filteredAddresses = addresses.filter(
		(addr) => addr.address !== address
	);

	setAddresses([...filteredAddresses]);
};
