import { gql } from '@apollo/client'

export const CONFIRM_TOKEN = gql`
    query {
        confirmToken {
            id
            username
            icon
            email
            password
            description
            created_at
            updated_at
        }
    }
`

export const CREATE_SESSION = gql`
    mutation ($email: String!, $password: String!){
        createSession(input: {
            email: $email
            password: $password
        })
    }
`