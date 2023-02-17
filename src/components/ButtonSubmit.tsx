interface ButtonSubmitProps {
	title: string;
}

export default function ButtonSubmit({ title }: ButtonSubmitProps) {
	return (
		<button
			type="submit"
			className="px-3 py-2 md:py-3 mt-4 rounded-lg w-full bg-blue-600 text-white"
		>
			{title}
		</button>
	);
}
