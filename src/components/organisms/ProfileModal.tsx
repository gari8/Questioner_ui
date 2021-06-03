import {
	Button,
	Input, Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent, ModalFooter,
	ModalHeader,
	ModalOverlay, Text, Textarea, useToast
} from "@chakra-ui/react";
import {currentUser} from "../../App";
import React, {FC, useState} from "react";
import {DisclosureInterface} from "../../types";
import UploadImg from "../molecules/UploadImg";

interface Props {
	profileDisclosure: DisclosureInterface
}

const ProfileModal: FC<Props> = ({ profileDisclosure }) => {
	const profileToast = useToast()
	const [blobURL, setBlobURL] = useState<string>('')

	const handleSave = () => {
		// TODO: Request
		profileToast({
			title: "プロフィールを保存しました",
			description: "",
			status: "success",
			duration: 3000,
			isClosable: true
		})
	}

	return (
		<Modal size={"2xl"} closeOnOverlayClick={true} isOpen={profileDisclosure.isOpen} onClose={profileDisclosure.onClose}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>プロフィール</ModalHeader>
				<ModalCloseButton />
				<ModalBody pb={6}>
					<UploadImg blobURL={blobURL} setBlobURL={setBlobURL} src={currentUser.icon} alt={currentUser.username} />
					<Text mx={3} mt={2} >お名前</Text>
					<Input type={"text"} w={1/3} defaultValue={currentUser.username} mx={2} my={1} />
					<Text mx={3} mt={2} >メールアドレス</Text>
					<Input type={"email"} w={2/5} defaultValue={currentUser.email} mx={2} my={1} />
					<Text mx={3} mt={2} >自己紹介</Text>
					<Textarea defaultValue={currentUser.description} ml={2} my={1} w={"97%"} />
				</ModalBody>
				<ModalFooter>
					<Button colorScheme="blue" mr={3} onClick={handleSave}>
						保存
					</Button>
					<Button onClick={profileDisclosure.onClose}>戻る</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	)
}

export default ProfileModal;