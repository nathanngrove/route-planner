import { useState } from "react";
import { Address } from "../../pages";
import useSwipe from "../../utils/useSwipe";

type AddressListItemProps = {
	address: Address;
	addresses: Array<Address>;
	setAddresses: (address: Array<Address>) => void;
	isEditing: boolean;
	draggedAddress: React.MutableRefObject<number>;
	draggedOverAddress: React.MutableRefObject<number>;
};

const AddressListItem = ({
	address,
	addresses,
	setAddresses,
	draggedAddress,
	draggedOverAddress,
}: AddressListItemProps) => {
	const { address: addressString, latLng, positionInList } = address;

	const [showDelete, setShowDelete] = useState(false);
	const [isHovering, setIsHovering] = useState(false);

	const { onTouchMove, onTouchStart, onTouchEnd } = useSwipe({
		direction: "horizontal",
		leftFunction: () => {
			setShowDelete(true);
		},
		rightFunction: () => {
			setShowDelete(false);
		},
	});

	// const [{ isDragging }, drag] = useDrag(() => ({
	// 	type: itemTypes.ADDRESS,
	// 	item: {
	// 		type: itemTypes.ADDRESS,
	// 		address: addressString,
	// 		latLng,
	// 		positionInList,
	// 	},
	// 	collect: (monitor) => ({
	// 		isDragging: !!monitor.isDragging(),
	// 	}),
	// }));

	// const [{ canDrop, isOver }, drop] = useDrop(() => ({
	// 	accept: itemTypes.ADDRESS,
	// 	drop: (item: {
	// 		type: string;
	// 		address: string;
	// 		latLng: LatLngLiteral;
	// 		positionInList: number;
	// 	}) => {
	// 		if (positionInList === item.positionInList) return;
	// 		console.log("addresses before filter", addresses);
	// 		const newAddresses = addresses.filter(
	// 			(addr) => addr.address !== item.address
	// 		);
	// 		console.log("newAddresses after filter", newAddresses);
	// 		newAddresses.splice(positionInList, 0, {
	// 			address: item.address,
	// 			latLng: item.latLng,
	// 			positionInList: positionInList,
	// 		});
	// 		console.log("newAddresses after splice", newAddresses);
	// 		newAddresses.forEach((address, i) => {
	// 			address.positionInList = i;
	// 		});

	// 		console.log("newAddresses after numbering", newAddresses);

	// 		setAddresses(newAddresses);
	// 	},
	// 	collect: (monitor) => ({
	// 		isOver: monitor.isOver(),
	// 		canDrop: monitor.canDrop(),
	// 	}),
	// }));

	function handleSort() {
		if (draggedAddress.current === -1 || draggedOverAddress.current === -1)
			return;
		if (draggedAddress.current === draggedOverAddress.current) return;

		const newAddresses = [...addresses];

		const filteredAddresses = newAddresses.filter(
			(addr) => addr.address !== addresses[draggedAddress.current].address
		);

		//add back in the draggedAddress

		filteredAddresses.forEach((address, i) => {
			address.positionInList = i;
		});

		setAddresses(filteredAddresses);
	}

	const firstCommaLoction = addressString.indexOf(",");
	const shortenedAddress = addressString.slice(0, firstCommaLoction);
	const restOfAddress = addressString.slice(
		firstCommaLoction + 2,
		addressString.length
	);

	const removeAddress = () => {
		const filteredAddresses = addresses.filter(
			(addr) => addr.address !== addressString
		);

		filteredAddresses.forEach((address, i) => {
			address.positionInList = i;
		});

		setAddresses([...filteredAddresses]);
	};

	return (
		<li
			// ref={(node) => drag(drop(node))}
			className="address-list-item"
			onMouseEnter={() => setIsHovering(true)}
			onMouseLeave={() => setIsHovering(false)}
			onDragStart={() => {
				draggedAddress.current = positionInList;
				console.log(draggedAddress.current, "onDragStart");
			}}
			onDragEnter={() => {
				draggedOverAddress.current = positionInList;
				console.log(
					draggedOverAddress.current,
					"onDragEnter",
					draggedAddress.current
				);
			}}
			onDragEnd={handleSort}
			onDragOver={(e) => e.preventDefault()}
			draggable>
			<button className={"remove-button"} onClick={removeAddress}>
				Delete
			</button>

			<div
				className={`address-list-item-content ${
					showDelete ? "show-delete" : "hide-delete"
				}`}
				onTouchMove={(e) => onTouchMove(e)}
				onTouchStart={(e) => onTouchStart(e)}
				onTouchEnd={() => onTouchEnd()}>
				<img src="https://placehold.co/30x30" alt="" />
				<span>{positionInList}</span>
				<p className="address-text flex-grow">
					{shortenedAddress}
					<span>{restOfAddress}</span>
				</p>

				<div className="buttons-group">
					{isHovering && (
						<button
							className="remove-hover"
							onClick={removeAddress}>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24">
								<path d="M3 6h18m-2 0v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6m3 0V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
							</svg>
						</button>
					)}
					{!isHovering && (
						<button className="remove-hover remove-hover-placeholder">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24">
								<path
									color="#ffffff"
									d="M3 6h18m-2 0v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6m3 0V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"
								/>
							</svg>
						</button>
					)}
					<a className="directions-button" href="#">
						GO
					</a>
				</div>
			</div>
		</li>
	);
};

export default AddressListItem;
