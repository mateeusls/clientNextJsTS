import axios from "axios";
import https from "https";

const httpsAgent = new https.Agent({
	rejectUnauthorized: false, // (NOTE: this will disable client verification)
});

export const api = axios.create({
	httpsAgent,
	baseURL: "https://creapp.herokuapp.com/",
});
