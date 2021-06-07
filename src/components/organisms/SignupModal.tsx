import React, {FC} from "react";
import {DisclosureInterface} from "../../types";
import {
	Button,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay
} from "@chakra-ui/react";

interface Props {
	disclosure: DisclosureInterface
}

const SignupModal: FC<Props> = ({ disclosure }) => {
	return (
		<Modal isOpen={disclosure.isOpen} onClose={disclosure.onClose} >
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>サインアップ</ModalHeader>
				<ModalCloseButton />
				<ModalBody pb={6}>

				</ModalBody>
				<ModalFooter>
					<Button colorScheme="blue" mr={3} onClick={() => {}}>
						保存
					</Button>
					<Button onClick={disclosure.onClose}>戻る</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	)
}

export default SignupModal;