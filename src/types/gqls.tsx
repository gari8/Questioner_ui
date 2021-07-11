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

export const GET_USERS = gql`
    query($limit: Int, $offset: Int) {
        users(limit: $limit, offset: $offset) {
            length
            users {
                id
                username
                icon
                email
                description
                questionCount
                answerCount
            }
        }
    }
`

export const GET_QUESTIONS = gql`
    query ($limit: Int, $offset: Int){
        questions(limit: $limit, offset: $offset) {
            length
            questions {
                id
                title
                content
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
    }
`

export const FIND_USER = gql`
    query ($id: ID!) {
        findUser(id: $id) {
            id
            username
            icon
            created_at
            updated_at
            description
            email
            password
            answerCount
            questionCount
            questions {
                user {
                    id
                    username
                    icon
                }
                answerType
                answerCount
                id
                title
                content
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
            enabled
            published
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
                created_at
                user {
                    id
                    username
                    icon
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

export const EDIT_PASSWORD = gql`
    mutation ($id: ID!, $newPassword: String!, $currentPassword: String!) {
        editPassword(id: $id, newPassword: $newPassword, currentPassword: $currentPassword)
    }
`

export const CREATE_ANSWER = gql`
    mutation ($input: NewAnswer!) {
        createAnswer(input: $input)
    }
`

export const SEARCH_KEYWORD = gql`
    query ($keyword: String!) {
        search(keyword: $keyword) {
            users {
                id
                icon
                username
                questionCount
                answerCount
            }
            questions {
                id
                title
                content
                answerCount
                user {
                    id
                    icon
                    username
                }
            }
        }
    }
`