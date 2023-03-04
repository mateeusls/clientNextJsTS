import {
	MutableRefObject,
	ReactNode,
	SelectHTMLAttributes,
	useEffect,
	useRef,
} from "react";

import { useField } from "@unform/core";
import { mergeRefs } from "react-merge-refs";

interface SelectProps {
	name: string;
	label: string;
	children: ReactNode;
	localRef?: MutableRefObject<any>;
	classeName?: string;
}

type Props = SelectHTMLAttributes<HTMLSelectElement> & SelectProps;

/**
 * Select component for Unform (without React Select)
 *
 * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select
 */
export function Select({
	name,
	label,
	children,
	localRef,
	classeName,
	...rest
}: Props) {
	const selectRef = useRef<HTMLSelectElement>(null);

	const { fieldName, defaultValue, registerField, error } = useField(name);

	useEffect(() => {
		registerField({
			ref: selectRef,
			name: fieldName,
			getValue: (ref) => {
				return ref.current?.value;
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
		<div className={classeName}>
			<label className="text-white" htmlFor={fieldName}>
				{label}
			</label>

			<select
				id={fieldName}
				ref={mergeRefs([selectRef, localRef])}
				defaultValue={defaultValue}
				className={`form-select w-full py-2 px-3 leading-5 rounded-md bg-white border border-gray-300 shadow-sm focus:outline-none focus:shadow-outline-blue-300 transition duration-150 ease-in-out disabled:bg-gray-500`}
				{...rest}
			>
				{children}
			</select>

			{error && <p className="text-center text-red-500">{error}</p>}
		</div>
	);
}
