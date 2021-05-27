import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {AuthProvider} from "./contexts/Auth";

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<AuthProvider>
					<Switch>
						<Route path="/" render={() => <p>a</p>}/>
					</Switch>
				</AuthProvider>
			</BrowserRouter>
		</div>
	);
}

export default App;
