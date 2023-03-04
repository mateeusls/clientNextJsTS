/* eslint-disable @next/next/no-img-element */
import { useField } from "@unform/core";
import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
interface Props {
	name: string;
	show?: boolean;
}
type InputProps = JSX.IntrinsicElements["input"] & Props;

export default function File({ name, show, ...rest }: InputProps) {
	const inputRef = useRef<HTMLInputElement>(null);
	const { fieldName, registerField, defaultValue, error } = useField(name);
	const [preview, setPreview] = useState(defaultValue);

	const handlePreview = useCallback((e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) {
			setPreview(null);
		}
		const previewURL = URL.createObjectURL(file);
		setPreview(previewURL);
	}, []);

	useEffect(() => {
		registerField({
			name: fieldName,
			ref: inputRef.current,
			path: "files[0]",
			clearValue(ref: HTMLInputElement) {
				ref.value = "";
				setPreview(null);
			},
			setValue(_: HTMLInputElement, value: string) {
				setPreview(value);
			},
		});
	}, [fieldName, registerField]);

	return (
		<>
			{show && preview && <img src={preview} alt="Preview" width="100" />}
			<input
				type="file"
				name={name}
				ref={inputRef}
				onChange={handlePreview}
				{...rest}
			/>
		</>
	);
}
