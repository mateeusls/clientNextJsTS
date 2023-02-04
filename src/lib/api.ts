import axios from "axios";

export const api = axios.create({
	baseURL: "http://187.87.138.222:3333/",
});
