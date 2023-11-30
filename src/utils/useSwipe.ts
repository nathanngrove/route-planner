import { useState } from "react";

type VerticalSwipe = {
	direction: "vertical";
	upFunction: () => void;
	downFunction: () => void;
};

type HorizontalSwipe = {
	direction: "horizontal";
	leftFunction: () => void;
	rightFunction: () => void;
};

type Swipe = VerticalSwipe | HorizontalSwipe;

const useSwipe = (swipe: Swipe) => {
	const [touchStart, setTouchStart] = useState<null | {
		x: number;
		y: number;
	}>(null);
	const [touchEnd, setTouchEnd] = useState<null | { x: number; y: number }>(
		null
	);
	const minSwipeDistance = 50;

	function onTouchStart(e: React.TouchEvent<HTMLDivElement>) {
		setTouchEnd(null);
		setTouchStart({
			x: e.targetTouches[0].clientX,
			y: e.targetTouches[0].clientY,
		});
	}

	function onTouchMove(e: React.TouchEvent<HTMLDivElement>) {
		setTouchEnd({
			x: e.targetTouches[0].clientX,
			y: e.targetTouches[0].clientY,
		});
	}

	function onTouchEnd() {
		if (!touchStart || !touchEnd) return;
		const distanceX = touchStart.x - touchEnd.x;
		const distanceY = touchStart.y - touchEnd.y;
		const isLeftSwipe = distanceX > minSwipeDistance;
		const isRightSwipe = distanceX < minSwipeDistance;
		const isUpSwipe = distanceY > minSwipeDistance;
		const isDownSwipe = distanceY < minSwipeDistance;

		if (swipe.direction === "vertical") {
			if (isDownSwipe) {
				swipe.downFunction();
			} else if (isUpSwipe) {
				swipe.upFunction();
			}
		} else if (swipe.direction === "horizontal") {
			if (isLeftSwipe) {
				swipe.leftFunction();
			} else if (isRightSwipe) {
				swipe.rightFunction();
			}
		}
	}

	return { onTouchStart, onTouchEnd, onTouchMove };
};

export default useSwipe;
