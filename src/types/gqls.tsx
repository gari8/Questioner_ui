import { gql } from '@apollo/client'

export const CONFIRM_TOKEN = gql`
    query {
        confirmToken {
            id
            username
            icon
            email
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

export const CREATE_QUESTION = gql`
    mutation ($input: NewQuestion!) {
        createQuestion(input: $input) {
            id
            title
            user {
                id
                username
            }
            choices {
                content
            }
            answerCount
            content
            textAfterAnswered
            published
            enabled
            answerType
            created_at
            updated_at
        }
    }
`