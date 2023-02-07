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
		api.defaults.headers["Authorization"] = undefined;
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
		const { token, userData } = data;

		setCookie(undefined, "creapp.token", token, {
			maxAge: 60 * 60 * 1, // 1 hour
		});
		setCookie(undefined, "creapp.user", userData.rnp, {
			maxAge: 60 * 60 * 1, // 1 hour
		});

		setUser(userData);

		api.defaults.headers["Authorization"] = `Bearer ${token}`;

		Router.push("/dashboard");
	}

	return (
		<AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut }}>
			{children}
		</AuthContext.Provider>
	);
}
