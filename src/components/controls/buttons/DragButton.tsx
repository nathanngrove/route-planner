import { DragPreviewImage, useDrag } from "react-dnd";
import { itemTypes } from "../../../utils/itemTypes";
import { useAddresses } from "../../../context/AddressesProvider";
import { knightImage } from "./knightImage";

type DragButtonProps = {
	address: string;
};

const DragButton = ({ address }: DragButtonProps) => {
	const { addresses } = useAddresses();

	const [{ isDragging }, drag, preview] = useDrag(
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

	return (
		<>
			<DragPreviewImage connect={preview} src={knightImage} />
			<div ref={drag}>
				<img src="https://placehold.co/30x30" alt="" />
			</div>
		</>
	);
};

export default DragButton;
