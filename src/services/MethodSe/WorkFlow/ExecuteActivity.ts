import { ClientSoap } from "@/services/ClientSe";

interface ExecuteActivityProps {
	wfid: string;
	activityid: string;
	ActionSequence: string;
}

export async function ExecuteActivity({
	wfid,
	activityid,
	ActionSequence,
}: ExecuteActivityProps) {
	const client = await ClientSoap("wf_ws");

	try {
		const args = {
			WorkflowID: wfid,
			ActivityID: activityid,
			ActionSequence: ActionSequence,
			UserID: "",
			ActivityOrder: "",
		};
		const results = await client.executeActivityAsync(args);

		return results[0];
	} catch (error) {
		return error;
	}
}
