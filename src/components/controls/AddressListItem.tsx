import { useState } from "react";
import { Address } from "../../pages";
import useSwipe from "../../utils/useSwipe";

type AddressListItemProps = {
	address: Address;
	addresses: Array<Address>;
	setAddresses: (address: Array<Address>) => void;
	isEditing: boolean;
	position: number;
	draggedAddress: React.MutableRefObject<number>;
	draggedOverAddress: React.MutableRefObject<number>;
};

const AddressListItem = ({
	address,
	addresses,
	setAddresses,
	position,
	draggedAddress,
	draggedOverAddress,
}: AddressListItemProps) => {
	const { address: addressString, latLng } = address;

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

	function handleSort() {
		if (draggedAddress.current === -1 || draggedOverAddress.current === -1)
			return;
		if (draggedAddress.current === draggedOverAddress.current) return;

		const newAddresses = [...addresses];

		const filteredAddresses = newAddresses.filter(
			(addr) => addr.address !== addresses[draggedAddress.current].address
		);

		filteredAddresses.push({
			address: addresses[draggedAddress.current].address,
			latLng: addresses[draggedAddress.current].latLng,
		});

		let i = filteredAddresses.length - 1;
		while (i !== draggedOverAddress.current) {
			console.log("i", i, filteredAddresses[i]);
			console.log("i-1", i - 1, filteredAddresses[i - 1]);
			console.log("draggedOver", draggedOverAddress.current);
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

	const removeAddress = () => {
		const filteredAddresses = addresses.filter(
			(addr) => addr.address !== addressString
		);

		setAddresses([...filteredAddresses]);
	};

	return (
		<li
			className="address-list-item"
			onMouseEnter={() => setIsHovering(true)}
			onMouseLeave={() => setIsHovering(false)}
			onDragStart={() => {
				draggedAddress.current = position;
			}}
			onDragEnter={() => {
				draggedOverAddress.current = position;
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
				<span>{position}</span>
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
