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

export const GET_QUERIES = gql`
    query ($limit: Int, $offset: Int){
        questions(limit: $limit, offset: $offset) {
            id
            title
            user {
                username
                icon
            }
        }
    }
`

export const FIND_QUERY = gql`
    query ($id: ID!){
        findQuestion(id: $id) {
            id
            title
            textAfterAnswered
            answerType
            content
            answered
            answerCount
            user {
                username
                icon
            }
            answers {
                id
                content
            }
            choices {
                content
                value
            }
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