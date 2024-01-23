import { useAddresses } from "../../../context/AddressesProvider";
import { removeAddress } from "../../../utils/removeAddress";

type RemoveButtonProps = {
	address: string;
	isHovering: boolean;
};

const RemoveButton = ({ address, isHovering }: RemoveButtonProps) => {
	const { addresses, setAddresses } = useAddresses();

	function renderButton() {
		if (isHovering)
			return (
				<button
					className="remove-hover"
					onClick={() =>
						removeAddress(address, addresses, setAddresses)
					}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24">
						<path d="M3 6h18m-2 0v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6m3 0V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
					</svg>
				</button>
			);
		return (
			<button className="remove-hover">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24">
					<path
						stroke="#ffffff"
						d="M3 6h18m-2 0v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6m3 0V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"
					/>
				</svg>
			</button>
		);
	}

	return renderButton();
};

export default RemoveButton;
