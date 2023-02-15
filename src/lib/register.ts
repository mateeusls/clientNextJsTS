import { api } from "@/services/api";

interface RegisterData {
	name: string;
	cpf: string;
	email: string;
	password: string;
}

type AxiosResponse = {
	message: string;
	user: object;
};

export async function RegisterUser(dataForm: RegisterData) {
	const { data } = await api.post<AxiosResponse | any>("/user", {
		...dataForm,
	});

	const {
		user = {
			id: data.id,
			name: data.name,
			cpf: data.cpf,
			email: data.email,
			rnp: data.rnp,
		},
		message,
	} = await data;

	return { user, message };
}
