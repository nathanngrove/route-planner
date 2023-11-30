import { useState } from "react";
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
	const [isEditing, setIsEditing] = useState(false);

	return (
		<div className="address-list-grow">
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
			<ul
				className={`address-list ${
					fullPanel ? "address-list-max" : "address-list-min"
				}`}>
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
		</div>
	);
};

export default AddressList;
