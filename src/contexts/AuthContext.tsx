import Router from "next/router";
import { parseCookies, setCookie } from "nookies";
import { createContext, useEffect, useState } from "react";

import { api } from "@/services/api";

type User = {
	id: number;
	name: string;
	email: string;
	cpf: string;
	rnpa: string;
};

type SignInData = {
	login: string;
	password: string;
};

type AuthContextType = {
	isAuthenticated: boolean;
	user: User;
	signIn: (data: SignInData) => Promise<void>;
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
		setUser(null);
		Router.push("/");
	}

	useEffect(() => {
		const { "creapp.token": token } = parseCookies();

		if (token) {
			api
				.post("/auth/verify", { token })
				.then((response) => {
					setUser(response.data);
				})
				.catch((error) => {
					console.log(error);
				});
		}
	}, []);

	async function signIn({ login, password }: SignInData) {
		const { data } = await api.post<AxiosResponse | any>("/auth", {
			login,
			password,
		});
		const { token, user } = data;

		setCookie(undefined, "creapp.token", token, {
			maxAge: 60 * 60 * 1, // 1 hour
		});

		setUser(user);

		api.defaults.headers["Authorization"] = `Bearer ${token}`;

		Router.push("/private");
	}

	return (
		<AuthContext.Provider value={{ user, isAuthenticated, signIn }}>
			{children}
		</AuthContext.Provider>
	);
}
