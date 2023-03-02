interface ButtonSubmitProps {
	title: string;
	onClick?: () => void;
}

export default function ButtonSubmit({ title, onClick }: ButtonSubmitProps) {
	return (
		<button
			type="submit"
			onClick={onClick}
			className="px-3 py-2 md:py-3 mt-4 rounded-lg w-full bg-blue-600 text-white"
		>
			{title}
		</button>
	);
}
