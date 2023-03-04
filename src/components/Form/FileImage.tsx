/* eslint-disable @next/next/no-img-element */
import { useField } from "@unform/core";
import { PlusCircle, XCircle } from "lucide-react";
import { useEffect, useRef } from "react";
interface Props {
	name: string;
	show?: boolean;
	title?: string;
	preview?: string;
	setPreview?: (value: string) => void;
}
type InputProps = JSX.IntrinsicElements["input"] & Props;

export default function FileImage({
	name,
	show,
	title,
	preview,
	setPreview,
	...rest
}: InputProps) {
	const localRef = useRef<HTMLInputElement>(null);
	const { fieldName, registerField, defaultValue, error } = useField(name);

	useEffect(() => {
		registerField({
			name: fieldName,
			ref: localRef.current,
			path: "files[0]",
			clearValue(ref: HTMLInputElement) {
				ref.value = "";
			},
			setValue(_: HTMLInputElement, value: string) {
				setPreview(value);
			},
		});
	}, [fieldName, registerField, setPreview]);

	return (
		<>
			<p className="text-sm text-white dark:text-white mb-2">{title}</p>
			<div className="block w-full m-auto overflow-hidden rounded-md shadow-sm my-2 relative">
				{show && preview && (
					<>
						<div className="w-full h-60 bg-gray-200 rounded-md ">
							<div className="w-full h-full object-contain cursor-pointer flex items-center justify-center">
								<img
									src={preview}
									alt="Preview"
									width="150"
									className="object-cover"
								/>
							</div>
						</div>
						<input
							type="file"
							name={name}
							ref={localRef}
							className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
							{...rest}
						/>
						<button
							className="absolute top-2 right-2 rounded-full flex items-center justify-center"
							onClick={() => setPreview(defaultValue)}
						>
							<XCircle size={24} color="red" />
						</button>
					</>
				)}
				{show && !preview && (
					<>
						<div className="w-full h-48 bg-gray-200 rounded-md ">
							<div className="w-full h-full object-contain cursor-pointer flex items-center justify-center">
								<PlusCircle size={80} color="#c8c8c8" />
							</div>
						</div>
						<input
							type="file"
							name={name}
							ref={localRef}
							className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
							{...rest}
						/>
					</>
				)}
			</div>
		</>
	);
}
