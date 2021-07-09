import {
    Button,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
    Textarea,
    useToast,
} from '@chakra-ui/react'
import React, { FC, useContext, useEffect, useState } from 'react'
import { DisclosureInterface } from '../../types'
import UploadImg from '../molecules/UploadImg'
import { sendErrorToast, sendSuccessToast } from '../../utilities/items'
import { AuthContext, tokenName } from '../../contexts/Auth'
import { EditUser, Scalars } from '../../generated/graphql'
import { useMutation } from '@apollo/client'
import { EDIT_USER } from '../../types/gqls'

interface Props {
    disclosure: DisclosureInterface
}

interface ProfileInput {
    username: string
    email: string
    icon: Scalars['Upload']
    description: string
}

const ProfileModal: FC<Props> = ({ disclosure }) => {
    const { currentUser, makeCurrentUser } = useContext(AuthContext)

    const initialProfileInput = {
        username: currentUser?.username!,
        icon: currentUser?.icon!,
        email: currentUser?.email!,
        description: currentUser?.description!,
    }
    const emptyFile = new File([], '')
    const profileToast = useToast()
    const [imageFile, setImageFile] = useState<File>(emptyFile)
    const [profileInput, setProfileInput] = useState<ProfileInput>(initialProfileInput)
    const [editUser] = useMutation(EDIT_USER)

    useEffect(() => {
        setProfileInput(initialProfileInput)
        // eslint-disable-next-line
    }, [])

    const handleSave = () => {
        // TODO: Request
        const payload: EditUser = {
            id: currentUser?.id!,
            username: profileInput.username ? profileInput.username : currentUser?.username!,
            email: profileInput.email ? profileInput.username : currentUser?.email!,
            description: profileInput.description ? profileInput.description : currentUser?.description!,
        }
        editUser({
            variables: { input: payload },
        }).then(_ => {
            const token = localStorage.getItem(tokenName)
            if (token) {
                makeCurrentUser(token)
                profileToast(sendSuccessToast)
            }
        }).catch(() => {
            profileToast(sendErrorToast)
        })
    }

    const handleReset = () => {
        setProfileInput(initialProfileInput)
        setImageFile(new File([], ''))
        console.log(imageFile)
        disclosure.onClose()
    }

    return (
        <Modal size={'2xl'} closeOnOverlayClick={false} isOpen={disclosure.isOpen} onClose={handleReset}>
            <ModalOverlay />
            <ModalContent mx={[4, 'auto']}>
                <ModalHeader>プロフィール</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    <UploadImg src={initialProfileInput.icon} alt={initialProfileInput.username}
                               setFile={setImageFile} />
                    <Text mx={3} mt={2}>お名前</Text>
                    <Input type={'text'} w={['97%', 1 / 3]} defaultValue={currentUser?.username} mx={2} my={1} onChange={(e) => {
                        const _profileInput = profileInput
                        _profileInput.username = e.target.value
                        setProfileInput(_profileInput)
                    }} />
                    <Text mx={3} mt={2}>メールアドレス</Text>
                    <Input type={'email'} w={['97%', 2 / 5]} defaultValue={currentUser?.email!} mx={2} my={1} onChange={(e) => {
                        const _profileInput = profileInput
                        _profileInput.email = e.target.value
                        setProfileInput(_profileInput)
                    }} />
                    <Text mx={3} mt={2}>自己紹介</Text>
                    <Textarea defaultValue={currentUser?.description!} ml={2} my={1} w={'97%'} onChange={(e) => {
                        const _profileInput = profileInput
                        _profileInput.description = e.target.value
                        setProfileInput(_profileInput)
                    }} />
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={handleSave}>
                        保存
                    </Button>
                    <Button onClick={handleReset}>戻る</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default ProfileModal