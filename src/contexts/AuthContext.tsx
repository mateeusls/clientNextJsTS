import Router from "next/router";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import { createContext, useEffect, useState } from "react";

import { api } from "@/services/api";

type User = {
	id: number;
	name: string;
	email: string;
	cpf: string;
	rnp: string;
};

type SignInData = {
	login: string;
	password: string;
};

type AuthContextType = {
	isAuthenticated: boolean;
	user: User;
	signIn: (data: SignInData) => Promise<void>;
	signOut: () => void;
};

type AxiosResponse = {
	data: {
		user: object;
		token: string;
	};
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }) {
	const [user, setUser] = useState<User | null>(null);

	const isAuthenticated = !!user;

	function signOut() {
		destroyCookie(undefined, "creapp.token");
		destroyCookie(undefined, "creapp.user");
		api.defaults.headers["Authorization"] = undefined;
		Router.push("/");
	}

	async function signIn({ login, password }: SignInData) {
		const { data } = await api.post<AxiosResponse | any>(
			"authentication/auth",
			{
				login,
				password,
			}
		);
		const { user, token } = data;

		setCookie(undefined, "creapp.token", token, {
			maxAge: 60 * 60 * 1, // 1 hour
		});
		setCookie(undefined, "creapp.user", user.rnp, {
			maxAge: 60 * 60 * 1, // 1 hour
		});

		setUser(user);
		api.defaults.headers["Authorization"] = `Bearer ${token}`;

		Router.push("/dashboard");
	}

	useEffect(() => {
		const { "creapp.token": token } = parseCookies();

		if (token) {
			api
				.post("authentication/verify", { token })
				.then((response) => {
					const user = {
						id: response.data.id,
						name: response.data.name,
						email: response.data.email,
						cpf: response.data.cpf,
						rnp: response.data.rnp,
					};
					setUser(user);
				})
				.catch((error) => {
					console.log(error);
				});
		}
	}, []);

	return (
		<AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut }}>
			{children}
		</AuthContext.Provider>
	);
}
