import React, {createContext, useEffect, useState} from "react";
import {useHistory} from "react-router";
import { useLazyQuery } from '@apollo/client'
import { CONFIRM_TOKEN } from '../types/gqls'
import { User } from '../generated/graphql'

interface IAuthContext {
	currentUser: User | null;
	resetCurrentUser: () => void;
	makeCurrentUser: (token: string) => void
}

const AuthContext = createContext<IAuthContext>({
	currentUser: null, resetCurrentUser: () => {
	}, makeCurrentUser: (token: string) => {
	}
});

export const tokenName = "faves4_token"

const AuthProvider = (props: any) => {
	const [currentUser, setCurrentUser] = useState<User | null>(
		null
	);
	const [ getConfirm, { data } ] = useLazyQuery(CONFIRM_TOKEN)

	const resetCurrentUser = () => {
		localStorage.removeItem(tokenName)
		setCurrentUser(null)
	}
	const makeCurrentUser = (token: string) => {
		localStorage.setItem(tokenName, token);
		getConfirm()
		if (data && data.confirmToken) setCurrentUser(data.confirmToken)
		console.log(currentUser)
	}
	const history = useHistory();

	useEffect(() => {
		const token = localStorage.getItem(tokenName)
		if (token) {
			getConfirm()
			if (data && data.confirmToken) setCurrentUser(data.confirmToken)
		}
	}, [history, currentUser, data, getConfirm]);

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