import { useState } from "react";
import { Address } from "../../pages";
import useSwipe from "../../hooks/useSwipe";
import DragButton from "./buttons/DragButton";
import GoButton from "./buttons/GoButton";
import RemoveButton from "./buttons/RemoveButton";
import MobileDeleteButton from "./buttons/MobileDeleteButton";
import { itemTypes } from "../../utils/itemTypes";
import { useDrop } from "react-dnd";
import { useAddresses } from "../../context/AddressesProvider";

type AddressListItemProps = {
	address: Address;
	position: number;
};

const AddressListItem = ({ address, position }: AddressListItemProps) => {
	const { id, address: addressString, latLng } = address;

	const [showDelete, setShowDelete] = useState(false);
	const [isHovering, setIsHovering] = useState(false);

	const { addresses, setAddresses } = useAddresses();

	const {
		onTouchMove: onSwipeToDelete,
		onTouchStart: onStartToDelete,
		onTouchEnd: onEndToDelete,
	} = useSwipe({
		direction: "horizontal",
		leftFunction: () => setShowDelete(true),
		rightFunction: () => setShowDelete(false),
	});

	const [{}, drop] = useDrop(
		() => ({
			accept: itemTypes.ADDRESS,
			drop: (item: { type: string; draggedAddress: string }) => {
				const dragged = addresses.findIndex(
					(addr) => addr.address === item.draggedAddress
				);
				const draggedOver = addresses.findIndex(
					(addr) => addr.address === addressString
				);

				handleSort(dragged, draggedOver);
			},
			collect: (monitor) => ({
				isOver: monitor.isOver(),
				canDrop: monitor.canDrop(),
			}),
		}),
		[addresses]
	);

	function handleSort(draggedAddress: number, draggedOverAddress: number) {
		console.log("dragged: ", draggedAddress, "over: ", draggedOverAddress);
		if (draggedAddress === -1 || draggedOverAddress === -1) return;
		if (draggedAddress === draggedOverAddress) return;

		const newAddresses = [...addresses];

		const filteredAddresses = newAddresses.filter(
			(addr) => addr.address !== addresses[draggedAddress].address
		);

		filteredAddresses.push({
			id: addresses[draggedAddress].id,
			address: addresses[draggedAddress].address,
			latLng: addresses[draggedAddress].latLng,
		});

		let i = filteredAddresses.length - 1;
		while (i !== draggedOverAddress) {
			const temp = filteredAddresses[i];
			filteredAddresses[i] = filteredAddresses[i - 1];
			filteredAddresses[i - 1] = temp;

			i = i - 1;
		}

		setAddresses(filteredAddresses);
	}

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
			ref={drop}>
			<MobileDeleteButton address={addressString} />
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
					<GoButton lat={latLng.lat} lng={latLng.lng} />
				</div>
			</div>
		</li>
	);
};

export default AddressListItem;
