import { useEffect, useRef } from "react";
import ReactInputMask, { Props as InputProps } from "react-input-mask";

import { useField } from "@unform/core";

interface Props extends InputProps {
	name: string;
	label?: string;
}

export default function InputMask({ name, label, ...rest }: Props) {
	const inputRef = useRef(null);
	const { fieldName, registerField, defaultValue, error, clearError } =
		useField(name);

	useEffect(() => {
		registerField({
			name: fieldName,
			ref: inputRef.current,
			path: "value",
		});
	}, [fieldName, registerField]);

	return (
		<div>
			{label && (
				<label htmlFor={fieldName} className="text-white">
					{label}
				</label>
			)}
			<ReactInputMask
				id={fieldName}
				ref={inputRef}
				onFocus={clearError}
				defaultValue={defaultValue}
				{...rest}
			/>
			{error && <p className="text-center text-red-500">{error}</p>}
		</div>
	);
}
