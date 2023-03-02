import { ClipLoader } from "react-spinners";

const LoadingScreen = () => {
	return (
		<div className="fixed z-50 top-0 left-0 w-screen h-screen flex justify-center items-center bg-black bg-opacity-40 transition-all duration-300">
			<div>
				<ClipLoader
					color={"#044a8c"}
					size={100}
					aria-label="Loading Spinner"
					data-testid="loader"
				/>
			</div>
		</div>
	);
};

export default LoadingScreen;
