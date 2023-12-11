import { useRef, useState } from "react";
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
	const ref = useRef<HTMLLIElement>(null);

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
		<li
			ref={ref}
			className="address-list-item"
			onMouseEnter={() => setIsHovering(true)}
			onMouseLeave={() => setIsHovering(false)}>
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
				{isEditing && <div>Move</div>}
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
					<a className="directions-button" href="#">
						GO
					</a>
				</div>
			</div>
		</li>
	);
};

export default AddressListItem;
