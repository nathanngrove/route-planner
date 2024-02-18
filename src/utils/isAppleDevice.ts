export default function isAppleDevice() {
	if (navigator.userAgent.includes("iPhone")) return true;
	if (navigator.userAgent.includes("Macintosh")) return true;

	return false;
}
