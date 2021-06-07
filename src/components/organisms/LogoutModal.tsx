import React, {FC} from "react";
import {DisclosureInterface} from "../../types";
import {
	Button,
	Modal,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay
} from "@chakra-ui/react";

interface Props {
	disclosure: DisclosureInterface
}

const LogoutModal: FC<Props> = ({ disclosure }) => {

	const handleLogout = () => {
		//TODO: logout
		disclosure.onClose()
	}

	return (
		<Modal isOpen={disclosure.isOpen} onClose={disclosure.onClose} >
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>ログアウトしますか？</ModalHeader>
				<ModalCloseButton />
				<ModalFooter>
					<Button colorScheme="blue" mr={3} onClick={handleLogout}>
						ログアウト
					</Button>
					<Button onClick={disclosure.onClose}>戻る</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	)
}

export default LogoutModal;