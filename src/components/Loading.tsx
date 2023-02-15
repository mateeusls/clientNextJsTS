import { ClipLoader } from "react-spinners";

const LoadingScreen = () => {
	return (
		<div className="absolute top-0 right-0 left-0 bottom-0 flex fle-col items-center justify-center h-screen bg-[#0000006b]">
			<div>
				<ClipLoader
					color={"#044a8c"}
					size={150}
					aria-label="Loading Spinner"
					data-testid="loader"
				/>
			</div>
		</div>
	);
};

export default LoadingScreen;
