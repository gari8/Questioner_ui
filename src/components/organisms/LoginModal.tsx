import React, { FC, useContext, useEffect, useState } from 'react'
import { DisclosureInterface } from '../../types'
import {
    Button,
    Flex,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay, useToast,
} from '@chakra-ui/react'
import { InputType, validator } from '../../utilities/validations'
import InputWithValidation from '../atoms/InputWithValidation'
import { useMutation } from '@apollo/client'
import { CREATE_SESSION } from '../../types/gqls'
import { AuthContext } from '../../contexts/Auth'
import { sendErrorToast, sendSuccessToast } from '../../utilities/items'


interface Props {
    disclosure: DisclosureInterface
}

const LoginModal: FC<Props> = ({ disclosure }) => {
    const [bool, setBool] = useState(true)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [login] = useMutation(CREATE_SESSION)
    const user = useContext(AuthContext)
    const loginToast = useToast()
    useEffect(() => {
        setBool(!validator(email, InputType.email) || !validator(password, InputType.password))
    }, [bool, email, password])
    const sendRequest = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        login({ variables: { email: email, password: password } }).then(r => {
            const token = r.data.createSession
            user.makeCurrentUser(token)
            loginToast(sendSuccessToast)
        }).catch(_ => {
            loginToast(sendErrorToast)
        }).finally(() => disclosure.onClose())
    }
    const onClose = () => {
        setPassword('')
        setEmail('')
        disclosure.onClose()
    }
    return (
        <Modal isOpen={disclosure.isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>ログイン</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    <Flex minH={36} flexDirection={'column'} justify={'space-around'}>
                        <InputWithValidation
                            type={InputType.email}
                            placeHolder={'Email'}
                            fieldName={'メールアドレス'}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <InputWithValidation
                            type={InputType.password}
                            placeHolder={'Password'}
                            fieldName={'パスワード'}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Flex>
                </ModalBody>
                <ModalFooter>
                    <Button disabled={bool} colorScheme='blue' mr={3} onClick={sendRequest}>
                        ログイン
                    </Button>
                    <Button onClick={onClose}>戻る</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default LoginModal