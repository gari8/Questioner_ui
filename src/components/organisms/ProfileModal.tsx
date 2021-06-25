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
	useToast
} from "@chakra-ui/react";
import React, { FC, useContext, useState } from 'react'
import {DisclosureInterface} from "../../types";
import UploadImg from "../molecules/UploadImg";
import {sendSuccessToast} from "../../utilities/items";
import { AuthContext } from '../../contexts/Auth'

interface Props {
	disclosure: DisclosureInterface
}

interface ProfileInput {
	username: string
	email: string
	icon: string
	description: string
}

const ProfileModal: FC<Props> = ({ disclosure }) => {
	const { currentUser } = useContext(AuthContext)

	const initialProfileInput = {
		username: currentUser?.username!,
		icon: currentUser?.icon!,
		email: currentUser?.email!,
		description: currentUser?.description!
	}
	const profileToast = useToast()
	const [imageFile, setImageFile] = useState<File>()
	const [profileInput, setProfileInput] = useState<ProfileInput>(initialProfileInput)



	const handleSave = () => {
		// TODO: Request
		const payload = {
			username: profileInput.username,
			email: profileInput.email,
			description: profileInput.description,
			iconFile: imageFile
		}
		console.log(payload)
		profileToast(sendSuccessToast)
	}

	const handleReset = () => {
		setProfileInput(initialProfileInput)
		setImageFile(new File([], ""))
		disclosure.onClose()
	}

	if (!currentUser) return <></>;

	return (
		<Modal size={"2xl"} closeOnOverlayClick={false} isOpen={disclosure.isOpen} onClose={handleReset}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>プロフィール</ModalHeader>
				<ModalCloseButton />
				<ModalBody pb={6}>
					<UploadImg src={initialProfileInput.icon} alt={initialProfileInput.username}  setFile={setImageFile}/>
					<Text mx={3} mt={2} >お名前</Text>
					<Input type={"text"} w={1/3} defaultValue={currentUser.username} mx={2} my={1} onChange={(e) => {
						const _profileInput = profileInput
						_profileInput.username = e.target.value
						setProfileInput(_profileInput)
					}}/>
					<Text mx={3} mt={2} >メールアドレス</Text>
					<Input type={"email"} w={2/5} defaultValue={currentUser.email!} mx={2} my={1} onChange={(e) => {
						const _profileInput = profileInput
						_profileInput.email = e.target.value
						setProfileInput(_profileInput)
					}}/>
					<Text mx={3} mt={2} >自己紹介</Text>
					<Textarea defaultValue={currentUser.description!} ml={2} my={1} w={"97%"} onChange={(e) => {
						const _profileInput = profileInput
						_profileInput.description = e.target.value
						setProfileInput(_profileInput)
					}}/>
				</ModalBody>
				<ModalFooter>
					<Button colorScheme="blue" mr={3} onClick={handleSave}>
						保存
					</Button>
					<Button onClick={handleReset}>戻る</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	)
}

export default ProfileModal;