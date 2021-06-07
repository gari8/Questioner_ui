import { UseToastOptions } from '@chakra-ui/react'
import { QuestionInterface, UserInterface } from '../types'

export enum ModalType {
    NewQuestion,
    Profile,
    Logout,
    Login,
    Signup,
}

export const sendSuccessToast: UseToastOptions = {
    title: '送信しました',
    description: '',
    status: 'success',
    duration: 3000,
    isClosable: true,
}

export const sendErrorToast: UseToastOptions = {
    title: '送信できませんでした',
    description: '',
    status: 'error',
    duration: 3000,
    isClosable: true,
}

export const currentUser: UserInterface | null = {
    id: 'sfdsfdrgergertgtrh',
    username: '田中太郎',
    email: 'aaa@gmail.com',
    icon: '',
    description:
        '初めまして初めまして初めまして初めまして初めまして初めまして初めまして初めまして初めまして初めまして初めまして初めまして初めまして\n初めまして初めまして初めまして初めまして初めまして初めまして',
}

// export const currentUser: UserInterface | null = null

export const testData: QuestionInterface[] = [
    {
        id: '1234524',
        title: '朝ごはん何食べますか？',
        responses: 62,
        term: {
            start: '12-04:08:12',
            end: '12-04:10:12',
        },
        user: {
            id: 'dasetgrfgfs',
            username: 'jimmy',
            icon: '',
        },
    },
    {
        id: '12342324',
        title: '晩ごはん何食べますか？',
        responses: 39,
        term: {
            start: '12-04:08:12',
            end: '12-04:10:12',
        },
        user: {
            id: 'dasetgrfg123434fs',
            username: 'kane',
            icon: '',
        },
    },
    {
        id: '32142324',
        title: '昼ごはん何食べますか？',
        responses: 109,
        term: {
            start: '12-04:08:12',
            end: '12-04:10:12',
        },
        user: {
            id: 'dasetg3243553454rfgfs',
            username: 'case',
            icon: '',
        },
    },
    {
        id: '32124',
        title: 'お菓子何食べますか？',
        responses: 19,
        term: {
            start: '12-04:08:12',
            end: '12-04:10:12',
        },
        user: {
            id: 'd1244234rfgfs',
            username: 'brian',
            icon: '',
        },
    },
    {
        id: '32124',
        title: 'お菓子何食べますか？',
        responses: 19,
        term: {
            start: '12-04:08:12',
            end: '12-04:10:12',
        },
        user: {
            id: 'daset43124354s',
            username: 'brian',
            icon: '',
        },
    },
    {
        id: '32124',
        title: 'お菓子何食べますか？',
        responses: 19,
        term: {
            start: '12-04:08:12',
            end: '12-04:10:12',
        },
        user: {
            id: 'daset908863456234',
            username: 'brian',
            icon: '',
        },
    },
    {
        id: '32124',
        title: 'お菓子何食べますか？',
        responses: 19,
        term: {
            start: '12-04:08:12',
            end: '12-04:10:12',
        },
        user: {
            id: 'das990890783489fs',
            username: 'brian',
            icon: '',
        },
    },
    {
        id: '32124',
        title: 'お菓子何食べますか？',
        responses: 19,
        term: {
            start: '12-04:08:12',
            end: '12-04:10:12',
        },
        user: {
            id: '-000954395693459',
            username: 'brian',
            icon: '',
        },
    },
    {
        id: '32124',
        title: 'お菓子何食べますか？',
        responses: 19,
        term: {
            start: '12-04:08:12',
            end: '12-04:10:12',
        },
        user: {
            id: 'das1245233423',
            username: 'brian',
            icon: '',
        },
    },
    {
        id: '32124',
        title: 'お菓子何食べますか？',
        responses: 19,
        term: {
            start: '12-04:08:12',
            end: '12-04:10:12',
        },
        user: {
            id: '2324534rfgfs',
            username: 'brian',
            icon: '',
        },
    },
    {
        id: '32124',
        title: 'お菓子何食べますか？',
        responses: 19,
        term: {
            start: '12-04:08:12',
            end: '12-04:10:12',
        },
        user: {
            id: '1232324133gfs',
            username: 'brian',
            icon: '',
        },
    },
    {
        id: '32124',
        title: 'お菓子何食べますか？',
        responses: 19,
        term: {
            start: '12-04:08:12',
            end: '12-04:10:12',
        },
        user: {
            id: '3223243434523fs',
            username: 'brian',
            icon: '',
        },
    },
]
