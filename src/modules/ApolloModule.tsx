import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const isDev = true
const productionURL = ""
const developmentURL = "http://localhost:8080/query"

const httpLink = createHttpLink({
    uri: '/query',
    credentials: 'same-origin'
});

const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('token');
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
        }
    }
});

export const client = new ApolloClient({
    uri: isDev ? developmentURL : productionURL,
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
});