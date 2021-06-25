import React, {createContext, useContext, useEffect, useState} from "react";
import {useHistory} from "react-router";
import { useQuery } from '@apollo/client'
import { CONFIRM_TOKEN } from '../types/gqls'

interface Auth {
	id: string
	name?: string
	password?: string
	text_id?: string
	update_at?: string
}

interface IAuthContext {
	currentUser: Auth | null | undefined;
	resetCurrentUser: () => void;
	makeCurrentUser: (token: string) => void
}

const AuthContext = createContext<IAuthContext>({
	currentUser: undefined, resetCurrentUser: () => {
	}, makeCurrentUser: (token: string) => {
	}
});

export const tokenName = "faves4_token"

const AuthProvider = (props: any) => {
	const [currentUser, setCurrentUser] = useState<Auth | null | undefined>(
		undefined
	);
	const { data } = useQuery(CONFIRM_TOKEN)

	const resetCurrentUser = () => {
		localStorage.removeItem(tokenName)
		setCurrentUser(undefined)
	}
	const makeCurrentUser = (token: string) => {
		localStorage.setItem(tokenName, token);
		// TODO: confirmSession
	}

	const user = useContext(AuthContext);
	const history = useHistory();

	useEffect(() => {
		const token = localStorage.getItem(tokenName)
		if (token) {
			// TODO: confirmSession
			console.log(data)
		}
	}, [history, user.currentUser, data]);

	return (
		<AuthContext.Provider
			value={{
				currentUser: currentUser,
				resetCurrentUser: resetCurrentUser,
				makeCurrentUser: makeCurrentUser
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
};

export {AuthContext, AuthProvider};