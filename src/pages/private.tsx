import { AuthContext } from "@/contexts/AuthContext";
import { useContext } from "react";

export default function Private() {
	const { user } = useContext(AuthContext);
	return (
		<div>
			<h1>Private</h1>
			<p>{user?.name}</p>
		</div>
	);
}
