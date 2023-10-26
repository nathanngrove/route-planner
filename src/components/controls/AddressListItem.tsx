import { Address } from "../../pages";

type AddressListItemProps = {
	address: string;
	addresses: Array<Address>;
	setAddresses: (address: Array<Address>) => void;
};

const AddressListItem = ({
	address,
	addresses,
	setAddresses,
}: AddressListItemProps) => {
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
		<li>
			<div className="address-list-item">
				<button className="remove-button" onClick={removeAddress}>
					<svg
						width="20"
						height="20"
						viewBox="0 0 20 20"
						fill="none"
						xmlns="http://www.w3.org/2000/svg">
						<path
							d="M10 1C5 1 1 5 1 10C1 15 5 19 10 19C15 19 19 15 19 10C19 5 15 1 10 1ZM10 17C6.1 17 3 13.9 3 10C3 6.1 6.1 3 10 3C13.9 3 17 6.1 17 10C17 13.9 13.9 17 10 17ZM6 9V11H14V9H6Z"
							fill="white"
						/>
					</svg>
				</button>
				<p className="address-text flex-grow">
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
