import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { tokenName } from '../contexts/Auth'

const productionURL = "https://faves4.herokuapp.com/query"
const developmentURL = "https://faves4-stg.herokuapp.com/query"
const localURL = "http://localhost:8080/query"

const handleUri = (): string => {
    if (process.env.VERCEL_ENV === "production") {
        return productionURL
    } else if (process.env.VERCEL_ENV === "development") {
        return developmentURL
    } else {
        return localURL
    }
}

const httpLink = createHttpLink({
    uri: handleUri(),
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