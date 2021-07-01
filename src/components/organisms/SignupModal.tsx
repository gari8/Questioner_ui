import React, { FC, useContext, useEffect, useState } from 'react'
import { DisclosureInterface } from '../../types'
import {
	Button,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay, useToast,
} from '@chakra-ui/react'
import { useMutation } from '@apollo/client'
import { CREATE_SESSION, CREATE_USER } from '../../types/gqls'
import InputWithValidation from '../atoms/InputWithValidation'
import { InputType, validator } from '../../utilities/validations'
import { NewUser } from '../../generated/graphql'
import { useHistory } from 'react-router'
import { sendErrorToast } from '../../utilities/items'
import { AuthContext } from '../../contexts/Auth'

interface Props {
	disclosure: DisclosureInterface
}

const SignupModal: FC<Props> = ({ disclosure }) => {
	const [signup] = useMutation(CREATE_USER)
	const [login] = useMutation(CREATE_SESSION)
	const { makeCurrentUser } = useContext(AuthContext)
	const [disable, setDisable] = useState(false)
	const [username, setUsername] = useState("")
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const history = useHistory()
	const signupToast = useToast()
	useEffect(() => {
		setDisable(!validator(email, InputType.email) || !validator(password, InputType.password) || !validator(username, InputType.name))
	}, [disable, username, email, password])
	const handleSignup = () => {
		const payload: NewUser = {
			username: username,
			email: email,
			password: password,
		}
		signup({ variables: { input: payload } }).then(() => {
			login({ variables: { email: email, password: password } }).then(r => {
				const token = r.data.createSession
				makeCurrentUser(token)
			}).catch(_ => {
				signupToast(sendErrorToast)
			}).finally(() => history.push("/dashboard"))
		}).catch(() => {
			signupToast(sendErrorToast)
		}).finally(disclosure.onClose)
	}
	const onClose = () => {
		setUsername("")
		setEmail("")
		setPassword("")
		disclosure.onClose()
	}
	return (
		<Modal isOpen={disclosure.isOpen} onClose={onClose} >
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>サインアップ</ModalHeader>
				<ModalCloseButton />
				<ModalBody pb={6}>
					<InputWithValidation type={InputType.name} fieldName={"お名前"} onChange={(e) => setUsername(e.target.value)}/>
					<InputWithValidation type={InputType.email} fieldName={"メールアドレス"} onChange={(e) => setEmail(e.target.value)}/>
					<InputWithValidation type={InputType.password} fieldName={"パスワード　"} onChange={(e) => setPassword(e.target.value)}/>
				</ModalBody>
				<ModalFooter>
					<Button colorScheme="blue" mr={3} onClick={handleSignup}>
						保存
					</Button>
					<Button onClick={onClose}>戻る</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	)
}

export default SignupModal;