import { Address } from "../../pages";
import AddressListItem from "./AddressListItem";

type AddressListProps = {
	addresses: Array<Address>;
	setAddresses: (addresses: Array<Address>) => void;
	fullPanel: boolean;
};

const AddressList = ({
	addresses,
	setAddresses,
	fullPanel,
}: AddressListProps) => {
	return (
		<div>
			<ul
				className={`address-list ${
					fullPanel ? "address-list-max" : "address-list-min"
				}`}>
				{addresses.map((address, index) => (
					<AddressListItem
						key={address.latLng.lat + address.latLng.lng}
						address={address}
						addresses={addresses}
						setAddresses={setAddresses}
						position={index}
					/>
				))}
			</ul>
		</div>
	);
};

export default AddressList;
