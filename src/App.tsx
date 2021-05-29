import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {AuthProvider} from "contexts/Auth";
import {ChakraProvider} from "@chakra-ui/react";
import Top from "pages/Top"
import Login from "pages/Login"
import Signup from "pages/Signup";
import Dashboard from "pages/Dashboard";
import MainFrame from "./components/templates/MainFrame";
import {theme} from "./assets/theme/theme";

export const currentUser = {
	username: "田中太郎",
	email: "aaa@gmail.com",
	icon: "",
	description: "初めまして"
}

function App() {
	return (
		<div className="App">
			<ChakraProvider theme={theme}>
				<BrowserRouter>
					<AuthProvider>
						<MainFrame>
							<Switch>
								<Route path="/" render={() => <Top />}/>
								<Route path="/login" render={() => <Login />}/>
								<Route path="/signup" render={() => <Signup />}/>
								<Route path="/dashboard" render={() => <Dashboard />}/>
							</Switch>
						</MainFrame>
					</AuthProvider>
				</BrowserRouter>
			</ChakraProvider>
		</div>
	);
}

export default App;
