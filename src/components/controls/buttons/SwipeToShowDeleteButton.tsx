import { useAddresses } from "../../../context/AddressesProvider";
import { removeAddress } from "../../../utils/removeAddress";

type SwipeToShowDeleteButtonProps = {
	address: string;
};

const SwipeToShowDeleteButton = ({ address }: SwipeToShowDeleteButtonProps) => {
	const { addresses, setAddresses } = useAddresses();

	return (
		<button
			className={"remove-button"}
			onClick={() => removeAddress(address, addresses, setAddresses)}>
			Delete
		</button>
	);
};

export default SwipeToShowDeleteButton;
