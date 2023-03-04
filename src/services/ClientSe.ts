import axios from "axios";
import https from "https";
import { BasicAuthSecurity, createClientAsync } from "soap";

export async function ClientSoap(component: string) {
	process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

	const client = await createClientAsync(
		`https://se.creape.org.br/se/ws/${component}.php?wsdl`,
		{}
	);

	const basicAuth = new BasicAuthSecurity(
		process.env.LOGIN_SE_SUITE,
		process.env.PASSWORD_SE_SUITE
	);

	client.setSecurity(basicAuth);

	return client;
}

const httpsAgent = new https.Agent({
	rejectUnauthorized: false,
});

export async function ClientRest(componente: string) {
	const client = axios.create({
		httpsAgent,
		baseURL: `https://se.creape.org.br/apigateway/${componente}`,
		headers: {
			authorization: process.env.TOKEN_SE_SUITE,
		},
	});
	return client;
}
