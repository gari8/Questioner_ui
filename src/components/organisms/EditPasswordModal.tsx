import React, { FC, useEffect, useState } from 'react'
import {
    Button,
    Flex, Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
} from '@chakra-ui/react'
import InputWithValidation from '../atoms/InputWithValidation'
import { InputType, validator } from '../../utilities/validations'
import { DisclosureInterface } from '../../types'

interface Props {
    disclosure: DisclosureInterface
}

const EditPasswordModal: FC<Props> = ({ disclosure }) => {
    const [bool, setBool] = useState<boolean>(true)
    const [currentPassword, setCurrentPassword] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    useEffect(() => {
        setBool(!validator(password, InputType.password) || !validator(currentPassword, InputType.password))
    }, [bool, password, currentPassword])
    const onClose = () => {
        setBool(true)
        setPassword("")
        setCurrentPassword("")
        disclosure.onClose()
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
                    <Button disabled={bool} colorScheme="blue" mr={3} onClick={() => {}}>
                        保存
                    </Button>
                    <Button onClick={onClose}>戻る</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default EditPasswordModal;