import React from 'react';
import ReactDOM from 'react-dom';
import './assets/css/index.css';
import './assets/css/tailwind.css';
import App from './App';
import {
	ApolloProvider,
} from "@apollo/client";
import { client } from './modules/ApolloModule'

ReactDOM.render(
	<React.StrictMode>
		<ApolloProvider client={client}>
			<App/>
		</ApolloProvider>
	</React.StrictMode>,
	document.getElementById('root')
);
