import { useState } from "react";
import { Address } from "../../pages";
import useSwipe from "../../hooks/useSwipe";
import DragButton from "./buttons/DragButton";
import GoButton from "./buttons/GoButton";
import RemoveButton from "./buttons/RemoveButton";
import SwipeToShowDeleteButton from "./buttons/SwipeToShowDeleteButton";

type AddressListItemProps = {
	address: Address;
	position: number;
};

const AddressListItem = ({ address, position }: AddressListItemProps) => {
	const { address: addressString, latLng } = address;

	const [showDelete, setShowDelete] = useState(false);
	const [isHovering, setIsHovering] = useState(false);

	const {
		onTouchMove: onSwipeToDelete,
		onTouchStart: onStartToDelete,
		onTouchEnd: onEndToDelete,
	} = useSwipe({
		direction: "horizontal",
		leftFunction: () => setShowDelete(true),
		rightFunction: () => setShowDelete(false),
	});

	const firstCommaLoction = addressString.indexOf(",");
	const shortenedAddress = addressString.slice(0, firstCommaLoction);
	const restOfAddress = addressString.slice(
		firstCommaLoction + 2,
		addressString.length
	);

	return (
		<li
			className="address-list-item"
			onMouseEnter={() => setIsHovering(true)}
			onMouseLeave={() => setIsHovering(false)}
			onTouchMove={(e) => onSwipeToDelete(e)}
			onTouchStart={(e) => onStartToDelete(e)}
			onTouchEnd={() => onEndToDelete()}
			draggable>
			<SwipeToShowDeleteButton address={addressString} />
			<div
				className={`address-list-item-content ${
					showDelete ? "show-delete" : "hide-delete"
				}`}>
				<DragButton address={addressString} />
				<span>{position}</span>
				<p className="address-text flex-grow">
					{shortenedAddress}
					<span>{restOfAddress}</span>
				</p>
				<div className="buttons-group">
					<RemoveButton
						isHovering={isHovering}
						address={addressString}
					/>
					<GoButton />
				</div>
			</div>
		</li>
	);
};

export default AddressListItem;
