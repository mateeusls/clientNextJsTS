import { useEffect } from "react";

const EscClose = ({ children, onClose, statusSideBar }) => {
	const handleKeyDown = (event: KeyboardEvent) => {
		if (event.key === "Escape") {
			onClose();
		}
	};

	useEffect(() => {
		document.addEventListener("keydown", handleKeyDown);
		return () => {
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, []);

	if (!statusSideBar) {
		return null;
	}

	return children;
};

export default EscClose;
