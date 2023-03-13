import { ClientSoap } from "@/services/ClientSe";

interface NewChildEntityRecordProps {
	wfid: string;
	mainentityid: string;
	childrelationshipid: string;
	attributelist: object[];
}

export async function NewChildEntityRecord({
	wfid,
	mainentityid,
	childrelationshipid,
	attributelist,
}: NewChildEntityRecordProps) {
	const client = await ClientSoap("wf_ws");

	const arr = [];
	for (const item in attributelist) {
		arr.push({
			EntityAttributeID: item,
			EntityAttributeValue: attributelist[item],
		});
	}

	try {
		const args = {
			WorkflowID: wfid,
			MainEntityID: mainentityid,
			ChildRelationshipID: childrelationshipid,
			EntityRecordList: [
				{
					EntityRecord: {
						EntityAttributeList: [
							{
								EntityAttribute: arr,
							},
						],
						RelationshipList: [],
					},
				},
			],
		};
		const results = await client.newChildEntityRecordListAsync(args);

		return results[0];
	} catch (error) {
		return error;
	}
}

// NewChildEntityRecord("se.creape.org.br", "RP-20230054", "registroprof" , "relgridtitulo", {tituloprofissio:"Teste 2", nivelcurso: "superior", dataentrada: "2023-01-01"})
