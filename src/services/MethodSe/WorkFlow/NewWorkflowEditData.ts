import { ClientSoap } from "@/services/ClientSe";

interface NewWorkflowEditDataProps {
	processid: string;
	wftitle: string;
	entityid: string;
	attributelist: object;
	filelist: Array<object> | "";
}

export async function NewWorkflowEditData({
	processid,
	wftitle,
	entityid,
	attributelist,
	filelist,
}: NewWorkflowEditDataProps) {
	const client = await ClientSoap("wf_ws");

	const arr = [];
	for (const i in attributelist) {
		arr.push({
			EntityAttributeID: `${i}`,
			EntityAttributeValue: `${attributelist[i]}`,
		});
	}

	try {
		const args = {
			ProcessID: processid,
			WorkflowTitle: wftitle,
			EntityList: [
				{
					Entity: {
						EntityID: entityid,
						EntityAttributeList: [
							{
								EntityAttribute: arr,
							},
						],
						EntityAttributeFileList: [
							{
								EntityAttributeFile: filelist,
							},
						],
					},
				},
			],
		};
		const results = await client.newWorkflowEditDataAsync(args);

		return results[0];
	} catch (error) {
		return error;
	}
}

// NewWorkflowEditData("suportegerencial-test.softexpert.com", "Testesg000007", "Teste API", "tabelatestes")
