import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { tokenName } from '../contexts/Auth'

const isDev = true
const productionURL = ""
const developmentURL = "http://localhost:8080/query"

const httpLink = createHttpLink({
    uri: isDev ? developmentURL : productionURL,
    credentials: 'same-origin'
});

const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem(tokenName);
    return {
        headers: {
            ...headers,
            authorization: token ? token : "",
        }
    }
});

export const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
});