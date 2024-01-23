import { useAddresses } from "../../context/AddressesProvider";
import AddressListItem from "./AddressListItem";

type AddressListProps = {
	fullPanel: boolean;
};

const AddressList = ({ fullPanel }: AddressListProps) => {
	const { addresses } = useAddresses();

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
						position={index}
					/>
				))}
			</ul>
		</div>
	);
};

export default AddressList;
