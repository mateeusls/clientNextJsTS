import { ChangeEvent } from "react";

// Extract base64 from file
export const getBase64 = (file: File): Promise<string> => {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => {
			resolve(reader.result as string);
		};
		reader.onerror = (error) => {
			reject(error);
		};
	});
};

// Create a preview from file
export const handlePreview = (
	e: ChangeEvent<HTMLInputElement>,
	setPreview: (value: string) => void
) => {
	const file = e.target.files?.[0];
	if (!file) {
		setPreview(null);
	}
	const previewURL = URL.createObjectURL(file);
	setPreview(previewURL);
};

// Tranform file to base64
export const handleFileChange = async (
	event: React.ChangeEvent<HTMLInputElement>,
	setFile: (value: File) => void,
	setBase64: (value: string) => void
) => {
	const files = event.target.files;
	if (files && files.length > 0) {
		setFile(files[0]);
		const fileBase64 = await getBase64(files[0]);
		setBase64(fileBase64);
	}
};
