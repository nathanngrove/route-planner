import { useState } from "react";
import { Address } from "../../pages";
import AddressListItem from "./AddressListItem";

type AddressListProps = {
	addresses: Array<Address>;
	setAddresses: (addresses: Array<Address>) => void;
};

const AddressList = ({ addresses, setAddresses }: AddressListProps) => {
	const [isEditing, setIsEditing] = useState(false);

	return (
		<>
			{!isEditing && (
				<button
					className="address-menu-button"
					onClick={() => setIsEditing(true)}>
					Edit
				</button>
			)}
			{isEditing && (
				<button
					className="address-menu-button"
					onClick={() => setIsEditing(false)}>
					Done
				</button>
			)}
			<ul className="address-list">
				{addresses.map(({ address, latLng }) => (
					<AddressListItem
						key={latLng.lat + latLng.lng}
						address={address}
						addresses={addresses}
						setAddresses={setAddresses}
						isEditing={isEditing}
					/>
				))}
			</ul>
		</>
	);
};

export default AddressList;
