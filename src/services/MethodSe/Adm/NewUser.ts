import { ClientSoap } from "../../ClientSe";

interface NewUserProps {
	idUser: string;
	name: string;
	login: string;
	passUser: string;
	email: string;
	idArea: string;
	idFunc: string;
	idAccGroup: string;
	cdLeader: string;
}

export async function NewUser({
	idUser,
	name,
	login,
	passUser,
	email,
	idArea,
	idFunc,
	idAccGroup,
	cdLeader,
}: NewUserProps) {
	const client = await ClientSoap("adm_ws");

	try {
		var args = {
			IDUSER: idUser,
			NAME: name,
			LOGIN: login,
			PASS: passUser,
			EMAIL: email,
			IDAREA: !idArea ? "" : idArea,
			IDFUNC: !idFunc ? "" : idFunc,
			IDACCGROUP: !idAccGroup ? "" : idAccGroup,
			CDLEADER: !cdLeader ? "" : cdLeader,
		};

		const resp = await client.newUserAsync(args);
		return resp;
	} catch (error) {
		return error;
	}
}

// NewUser("nagem.softexpert.com", "jonh.doe", "Jon Doe", "jonh.doe", "112233a", "test@test.com")
