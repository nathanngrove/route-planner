import { useDrag, useDrop } from "react-dnd";
import { itemTypes } from "../../../utils/itemTypes";
import { useAddresses } from "../../../context/AddressesProvider";

type DragButtonProps = {
	address: string;
};

const DragButton = ({ address }: DragButtonProps) => {
	const { addresses, setAddresses } = useAddresses();

	const [{ isDragging }, drag] = useDrag(
		() => ({
			type: itemTypes.ADDRESS,
			item: {
				type: itemTypes.ADDRESS,
				draggedAddress: address,
			},
			collect: (monitor) => ({
				isDragging: !!monitor.isDragging(),
			}),
		}),
		[addresses]
	);

	const [{}, drop] = useDrop(
		() => ({
			accept: itemTypes.ADDRESS,
			drop: (item: { type: string; draggedAddress: string }) => {
				const dragged = addresses.findIndex(
					(addr) => addr.address === item.draggedAddress
				);
				const draggedOver = addresses.findIndex(
					(addr) => addr.address === address
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

	return (
		<div ref={(node) => drag(drop(node))}>
			<img src="https://placehold.co/30x30" alt="" />
		</div>
	);
};

export default DragButton;
