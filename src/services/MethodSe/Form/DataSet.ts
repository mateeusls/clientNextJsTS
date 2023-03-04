import { ClientRest } from "@/services/ClientSe";

interface DataSetProps {
	dataset: string;
	params?: object;
}

export async function DataSet({ dataset, params }: DataSetProps) {
	const client = await ClientRest("v1/dataset-integration");

	try {
		const { data } = await client.post(dataset, params || { "": "" });
		return data;
	} catch (error) {
		return error;
	}
}
