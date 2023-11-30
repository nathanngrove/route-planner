import { useState } from "react";
import { Address } from "../../pages";
import useSwipe from "../../utils/useSwipe";

type AddressListItemProps = {
	address: string;
	addresses: Array<Address>;
	setAddresses: (address: Array<Address>) => void;
	isEditing: boolean;
};

const AddressListItem = ({
	address,
	addresses,
	setAddresses,
	isEditing,
}: AddressListItemProps) => {
	const [showDelete, setShowDelete] = useState(false);

	const { onTouchMove, onTouchStart, onTouchEnd } = useSwipe({
		direction: "horizontal",
		leftFunction: () => {
			setShowDelete(true);
		},
		rightFunction: () => {
			setShowDelete(false);
		},
	});

	const firstCommaLoction = address.indexOf(",");
	const shortenedAddress = address.slice(0, firstCommaLoction);
	const restOfAddress = address.slice(firstCommaLoction + 2, address.length);

	const removeAddress = () => {
		const filteredAddresses = addresses.filter(
			(addr) => addr.address !== address
		);
		setAddresses([...filteredAddresses]);
	};

	return (
		<li className="address-list-item">
			<button
				className={`remove-button ${
					showDelete ? "bring-up" : "bring-down"
				}`}
				onClick={removeAddress}>
				Delete
			</button>
			<div
				className={`address-list-item-content ${
					showDelete ? "show-delete" : "hide-delete"
				}`}
				onTouchMove={(e) => onTouchMove(e)}
				onTouchStart={(e) => onTouchStart(e)}
				onTouchEnd={() => onTouchEnd()}>
				<button>Move</button>
				<p className="address-text">
					{shortenedAddress}
					<span>{restOfAddress}</span>
				</p>
				<a className="directions-button" href="#">
					GO
				</a>
			</div>
		</li>
	);
};

export default AddressListItem;
