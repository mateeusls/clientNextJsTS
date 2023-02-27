import { InputHTMLAttributes, RefObject, useEffect, useRef } from "react";

import { useField } from "@unform/core";

interface Props {
	name: string;
	label?: string;
	options: {
		id: string;
		value: string;
		label: string;
		checked?: boolean;
	}[];
}

type RefInputEl = RefObject<HTMLInputElement[]>;

type InputProps = InputHTMLAttributes<HTMLInputElement> & Props;

export function Radio({ name, label, options, ...rest }: InputProps) {
	const inputRefs = useRef([]);
	const { fieldName, registerField, defaultValue = "", error } = useField(name);

	useEffect(() => {
		registerField({
			name: fieldName,
			ref: inputRefs,
			getValue: (refs: RefInputEl) => {
				return refs.current.find((input) => input?.checked)?.value;
			},
			setValue: (refs: RefInputEl, id: string) => {
				const inputRef = refs.current.find((ref) => ref.id === id);
				if (inputRef) inputRef.checked = true;
			},
			clearValue: (refs: RefInputEl) => {
				const inputRef = refs.current.find((ref) => ref.checked === true);
				if (inputRef) inputRef.checked = false;
			},
		});
	}, [fieldName, registerField]);

	return (
		<>
			{label && <p>{label}</p>}

			{options.map((option, index) => (
				<label
					key={option.id}
					className="text-sm font-medium leading-5 text-white dark:text-white flex items-center gap-2 mt-1"
				>
					<input
						type="radio"
						ref={(ref) => {
							inputRefs.current[index] = ref;
						}}
						id={option.id}
						name={fieldName}
						defaultChecked={defaultValue.includes(option.id)}
						value={option.value}
						{...rest}
						className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
					/>

					<span key={option.id}>{option.label}</span>
				</label>
			))}

			{error && <span>{error}</span>}
		</>
	);
}
