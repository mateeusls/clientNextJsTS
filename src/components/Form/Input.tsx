import {
	InputHTMLAttributes,
	MutableRefObject,
	useEffect,
	useRef,
} from "react";

import { useField } from "@unform/core";
import { mergeRefs } from "react-merge-refs";

interface Props {
	name: string;
	type?:
		| "text"
		| "number"
		| "color"
		| "date"
		| "datetime-local"
		| "email"
		| "hidden"
		| "month"
		| "password"
		| "time"
		| "range"
		| "search"
		| "tel"
		| "url"
		| "week";
	label?: string;
	value?: string;
	localRef?: MutableRefObject<any>;
}

type InputProps = InputHTMLAttributes<HTMLInputElement> & Props;

export function Input({
	name,
	type,
	label,
	value,
	localRef,
	...rest
}: InputProps) {
	const inputRef = useRef(null);
	const { fieldName, defaultValue, registerField, error, clearError } =
		useField(name);

	/**
	 * If you add a value to the input, it will be considered the default
	 * This is useful when you have a `<input type="hidden" />`
	 *
	 * You can also remove it and use the `initialData` or set dynamically.
	 */
	const defaultInputValue = value || defaultValue;

	useEffect(() => {
		registerField({
			name: fieldName,
			ref: inputRef,
			getValue: (ref) => {
				return ref.current.value;
			},
			setValue: (ref, newValue) => {
				ref.current.value = newValue;
			},
			clearValue: (ref) => {
				ref.current.value = "";
			},
		});
	}, [fieldName, registerField]);

	return (
		<div>
			<label className="text-white" htmlFor={fieldName}>
				{label}
			</label>

			<input
				type={type || "text"}
				id={fieldName}
				onFocus={clearError}
				ref={mergeRefs([inputRef, localRef])}
				defaultValue={defaultInputValue}
				{...rest}
			/>

			{error && <p className="text-red-500">{error}</p>}
		</div>
	);
}
