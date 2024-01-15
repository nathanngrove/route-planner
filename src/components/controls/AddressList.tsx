import { useRef, useState } from "react";
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

	const draggedAddress = useRef<number>(-1);
	const draggedOverAddress = useRef<number>(-1);

	return (
		<div>
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
				{addresses.map((address, index) => (
					<AddressListItem
						key={address.latLng.lat + address.latLng.lng}
						address={address}
						addresses={addresses}
						setAddresses={setAddresses}
						isEditing={isEditing}
						position={index}
						draggedAddress={draggedAddress}
						draggedOverAddress={draggedOverAddress}
					/>
				))}
			</ul>
		</div>
	);
};

export default AddressList;
