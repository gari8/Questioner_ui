import React, {createContext, useContext, useEffect, useState} from "react";
import Axios, {endPoint} from "../modules/AxiosModule";
import {useHistory} from "react-router";

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

const tokenName = "faves4_token"

const AuthProvider = (props: any) => {
	const [currentUser, setCurrentUser] = useState<Auth | null | undefined>(
		undefined
	);
	const resetCurrentUser = () => {
		localStorage.removeItem(tokenName)
		setCurrentUser(undefined)
	}
	const makeCurrentUser = (token: string) => {
		localStorage.setItem(tokenName, token);
		Axios.get(endPoint.confirm, {
			headers: {
				'Access-Control-Allow-Origin': '*',
				'x-http-token': localStorage.getItem(tokenName)
			},
		}).then(r => {
			setCurrentUser(r.data.user)
			if (user.currentUser) {
				history.push('/dashboard')
			}
		})
	}

	const user = useContext(AuthContext);
	const history = useHistory();

	useEffect(() => {
		const token = localStorage.getItem(tokenName)
		if (token) {
			Axios.get(endPoint.confirm, {
				headers: {
					'Access-Control-Allow-Origin': '*',
				},
			}).then(r => {
				if (!user.currentUser) {
					setCurrentUser(r.data.user)
				}
			})
		}
	}, [history, user.currentUser]);

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