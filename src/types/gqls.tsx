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

export const GET_QUESTIONS = gql`
    query ($limit: Int, $offset: Int){
        questions(limit: $limit, offset: $offset) {
            id
            title
            answerType
            answerCount
            termStart
            termEnd
            user {
                username
                icon
            }
        }
    }
`

export const FIND_QUESTION = gql`
    query ($id: ID!, $userId: ID){
        findQuestion(id: $id, userId: $userId) {
            id
            title
            textAfterAnswered
            answerType
            content
            answered
            answerCount
            user {
                username
                id
                icon
            }
            answerers {
                username
                id
                icon
            }
            answers {
                id
                content
                user {
                    id
                }
            }
            choices {
                id
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

export const CREATE_USER = gql`
    mutation ($input: NewUser!) {
        createUser(input: $input) {
            id
            username
            icon
            created_at
            updated_at
            description
            email
            password
        }
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

export const EDIT_USER = gql`
    mutation ($input: EditUser!) {
        editUser(input: $input) {
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

export const CREATE_ANSWER = gql`
    mutation ($input: NewAnswer!) {
        createAnswer(input: $input)
    }
`