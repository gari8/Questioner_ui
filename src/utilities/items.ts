import { UseToastOptions } from '@chakra-ui/react'

export enum ModalType {
    NewQuestion,
    Profile,
    Logout,
    Login,
    Signup,
    EditPassword,
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
