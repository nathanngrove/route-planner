import {
	getGeocode,
	getLatLng,
	ClearSuggestions,
	Suggestions,
	SetValue,
} from "use-places-autocomplete";
import {
	Combobox,
	ComboboxInput,
	ComboboxPopover,
	ComboboxList,
	ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";
import { useNotificationsUpdate } from "../../context/NotificationsProvider";
import { Address } from "../../pages";

type AddressInputProps = {
	addresses: Array<Address>;
	setAddresses: (address: Address) => void;
	ready: boolean;
	value: string;
	setValue: SetValue;
	suggestions: Suggestions;
	clearSuggestions: ClearSuggestions;
	setFullPanel: React.Dispatch<React.SetStateAction<boolean>>;
};

const AddressInput = ({
	addresses,
	setAddresses,
	ready,
	value,
	setValue,
	suggestions,
	clearSuggestions,
	setFullPanel,
}: AddressInputProps) => {
	const { status, data } = suggestions;

	const updateNotifications = useNotificationsUpdate();

	const handleSelect = async (val: string) => {
		setValue(val, false);
		clearSuggestions();

		if (
			addresses.find((address) => address.address === val) === undefined
		) {
			const results = await getGeocode({ address: val });
			const { lat, lng } = await getLatLng(results[0]);

			setAddresses({
				address: val,
				latLng: { lat, lng },
			});

			return;
		}

		updateNotifications("error", "Something went wrong.");
	};

	return (
		<Combobox onSelect={handleSelect} className="combobox-container">
			<ComboboxInput
				value={value}
				onFocus={() => {
					setFullPanel(true);
				}}
				onChange={(e) => setValue(e.target.value)}
				disabled={!ready}
				className="combobox-input"
				placeholder="Enter an address"
			/>
			<ComboboxPopover className="combobox-popover">
				<ComboboxList>
					{status === "OK" &&
						data.map(({ place_id, description }) => (
							<ComboboxOption
								key={place_id}
								value={description}
							/>
						))}
				</ComboboxList>
			</ComboboxPopover>
		</Combobox>
	);
};

export default AddressInput;
