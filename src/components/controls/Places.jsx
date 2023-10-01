import React from "react";

import { getGeocode, getLatLng } from "use-places-autocomplete";
import {
	Combobox,
	ComboboxInput,
	ComboboxPopover,
	ComboboxList,
	ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";

const Places = ({
	addresses,
	setAddresses,
	ready,
	value,
	setValue,
	suggestions,
	clearSuggestions,
}) => {
	const { status, data } = suggestions;

	const handleSelect = async (val) => {
		setValue(val, false);
		clearSuggestions();

		const results = await getGeocode({ address: val });
		const { lat, lng } = await getLatLng(results[0]);

		setAddresses({
			address: val,
			latLng: { lat, lng },
			visited: false,
		});
	};

	return (
		<Combobox onSelect={handleSelect}>
			<ComboboxInput
				value={value}
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

export default Places;
