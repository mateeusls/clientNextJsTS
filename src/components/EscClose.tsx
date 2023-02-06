import { useEffect } from "react";

const EscClose = ({ children, onClose, statusSideBar }) => {
	// eslint-disable-next-line react-hooks/exhaustive-deps
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
	}, [handleKeyDown, statusSideBar]);

	if (!statusSideBar) {
		return null;
	}

	return children;
};

export default EscClose;
