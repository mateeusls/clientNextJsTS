import { InputHTMLAttributes, useEffect, useRef } from "react";

import { useField } from "@unform/core";

interface Props {
	name: string;
	label?: string;
	value?: "1" | "0";
}

type InputProps = InputHTMLAttributes<HTMLInputElement> & Props;

export function Checkbox({ name, value, label, ...rest }: InputProps) {
	const inputRef = useRef();
	const {
		fieldName,
		defaultValue = "0",
		registerField,
		error,
	} = useField(name);

	const defaultChecked = defaultValue === value;

	useEffect(() => {
		registerField({
			name: fieldName,
			ref: inputRef,
			getValue: (ref) => {
				return ref.current.value;
			},
			clearValue: (ref) => {
				/**
				 * If you want to change the default checked for false or true,
				 * you can do so here. In this example, when resetting the form,
				 * the checkbox goes back to its initial state.
				 */
				ref.current.value = defaultChecked;
			},
			setValue: (ref, value) => {
				ref.current.checked = value;
			},
		});
	}, [defaultValue, fieldName, registerField, defaultChecked]);

	return (
		<div className="text-sm font-medium leading-5 text-white dark:text-white flex items-center gap-2 ">
			<input
				defaultChecked={defaultChecked}
				ref={inputRef}
				value={value}
				type="checkbox"
				id={fieldName}
				{...rest}
				className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
			/>

			<label htmlFor={fieldName} key={fieldName}>
				{label}
			</label>

			{error && <p className="text-red-500">{error}</p>}
		</div>
	);
}
