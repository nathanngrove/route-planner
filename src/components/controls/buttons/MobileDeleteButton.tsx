import { useAddresses } from "../../../context/AddressesProvider";
import { removeAddress } from "../../../utils/removeAddress";

type MobileDeleteButtonProps = {
	address: string;
};

const MobileDeleteButton = ({ address }: MobileDeleteButtonProps) => {
	const { addresses, setAddresses } = useAddresses();

	return (
		<button
			className={"remove-button"}
			onClick={() => removeAddress(address, addresses, setAddresses)}>
			Delete
		</button>
	);
};

export default MobileDeleteButton;
