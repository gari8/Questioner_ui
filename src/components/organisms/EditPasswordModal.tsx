import React, { FC, useContext, useEffect, useState } from 'react'
import {
    Button,
    Flex, Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay, useToast,
} from '@chakra-ui/react'
import InputWithValidation from '../atoms/InputWithValidation'
import { InputType, validator } from '../../utilities/validations'
import { DisclosureInterface } from '../../types'
import { useMutation } from '@apollo/client'
import { EDIT_PASSWORD } from '../../types/gqls'
import { AuthContext } from '../../contexts/Auth'
import { sendErrorToast, sendSuccessToast } from '../../utilities/items'

interface Props {
    disclosure: DisclosureInterface
}

const EditPasswordModal: FC<Props> = ({ disclosure }) => {
    const { currentUser } = useContext(AuthContext)
    const [bool, setBool] = useState<boolean>(true)
    const [currentPassword, setCurrentPassword] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const editPasswordToast = useToast()
    const [editPassword] = useMutation(EDIT_PASSWORD)
    useEffect(() => {
        setBool(!validator(password, InputType.password) || !validator(currentPassword, InputType.password))
    }, [bool, password, currentPassword])
    const onClose = () => {
        setBool(true)
        setPassword("")
        setCurrentPassword("")
        disclosure.onClose()
    }
    const handleSubmit = () => {
        if (!currentUser) return
        editPassword({
            variables: {
                id: currentUser.id,
                newPassword: password,
                 currentPassword: currentPassword
            }
        }).then(r => {
            r.data && r.data.editPassword ? editPasswordToast(sendSuccessToast) : editPasswordToast(sendErrorToast);
        }).catch(() => {
            editPasswordToast(sendErrorToast)
        }).finally(() => {
            setBool(true)
            setPassword("")
            setCurrentPassword("")
            disclosure.onClose()
        })
    }
    return (
        <Modal isOpen={disclosure.isOpen} onClose={onClose} >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>パスワード編集</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    <Flex minH={36} flexDirection={'column'} justify={'space-around'}>
                        <InputWithValidation
                            type={InputType.password}
                            placeHolder={"現在のパスワード"}
                            fieldName={"現在のパスワード"}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                        />
                        <InputWithValidation
                            type={InputType.password}
                            placeHolder={"新しいパスワード"}
                            fieldName={"新しいパスワード"}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Flex>
                </ModalBody>
                <ModalFooter>
                    <Button disabled={bool} colorScheme="blue" mr={3} onClick={handleSubmit}>
                        保存
                    </Button>
                    <Button onClick={onClose}>戻る</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default EditPasswordModal;