import React, { FC, useContext } from 'react'
import { DisclosureInterface } from '../../types'
import {
    Button,
    Modal,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay, useToast,
} from '@chakra-ui/react'
import { AuthContext } from '../../contexts/Auth'
import { sendSuccessToast } from '../../utilities/items'

interface Props {
    disclosure: DisclosureInterface
}

const LogoutModal: FC<Props> = ({ disclosure }) => {
    const { resetCurrentUser } = useContext(AuthContext)
    const logoutToast = useToast()
    const handleLogout = () => {
        resetCurrentUser()
        disclosure.onClose()
        logoutToast(sendSuccessToast)
    }

    return (
        <Modal isOpen={disclosure.isOpen} onClose={disclosure.onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>ログアウトしますか？</ModalHeader>
                <ModalCloseButton />
                <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={handleLogout}>
                        ログアウト
                    </Button>
                    <Button onClick={disclosure.onClose}>戻る</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default LogoutModal