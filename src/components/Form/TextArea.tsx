import { TextareaHTMLAttributes, useEffect, useRef } from "react";

import { useField } from "@unform/core";

interface Props {
	name: string;
	label?: string;
}

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & Props;

export function Textarea({ name, label, ...rest }: TextareaProps) {
	const textareaRef = useRef(null);
	const { fieldName, defaultValue = "", registerField, error } = useField(name);

	useEffect(() => {
		registerField({
			name: fieldName,
			ref: textareaRef,
			getValue: (ref) => {
				return ref.current.value;
			},
			setValue: (ref, value) => {
				ref.current.value = value;
			},
			clearValue: (ref) => {
				ref.current.value = "";
			},
		});
	}, [fieldName, registerField]);

	return (
		<div>
			<textarea
				ref={textareaRef}
				id={fieldName}
				defaultValue={defaultValue}
				{...rest}
				placeholder={label || "Digite aqui..."}
				className="form-input w-full rounded-md p-2 border outline-none border-blue-400 mt-3"
			/>

			{error && <span>{error}</span>}
		</div>
	);
}
