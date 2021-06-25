import React, { FC, useContext, useState } from 'react'
import {
	Flex, IconButton,
	Input,
	InputGroup,
	InputLeftElement, Menu, MenuButton,
	MenuItem,
	MenuList,
	Spacer, useDisclosure,
	Icon, Avatar, Text
} from "@chakra-ui/react";
import {
	AddIcon, AtSignIcon,
	EditIcon,
	HamburgerIcon,
	SearchIcon
} from "@chakra-ui/icons";
import ModalWrapper from "./ModalWrapper";
import { HiLogout, HiLogin, HiUserAdd } from "react-icons/hi";
import {ModalType} from "../../utilities/items";
import {useHistory} from "react-router";
import { AuthContext } from '../../contexts/Auth'

const Header: FC = () => {
	const disclosure = useDisclosure()
	const history = useHistory()
	const user = useContext(AuthContext)
	const currentUser = user.currentUser
	// switch modalType
	const [modalType, setModalType] = useState<ModalType>(ModalType.Profile)
	return (
		<Flex
			as={"header"}
			width={"full"}
			shadow={"sm"}
			py={2}
			px={8}
		>
			<Flex
				onClick={() => history.push("/")}
				cursor={"pointer"}
			>
				<Avatar name={"F"} size={"md"} fontWeight={"black"} bg={"black"}/>
				<Flex flexDirection={"column"} justify={"flex-end"}>
					<Text fontWeight={"black"}>avs4</Text>
				</Flex>
			</Flex>
			<Spacer />
			<Flex flexDirection={'column'} justify={'center'}>
				<InputGroup
					w={80}
					mx={5}
				>
					<InputLeftElement
						pointerEvents="none"
						children={<SearchIcon color="gray.300" />}
					/>
					<Input type="text" placeholder="キーワード" />
				</InputGroup>
			</Flex>
			<Menu>
				<Flex flexDirection={'column'} justify={'center'}>
					<MenuButton
						as={IconButton}
						aria-label="Options"
						icon={<HamburgerIcon />}
						variant="outline"
						_focus={{ outline: 0 }}
					/>
				</Flex>
				{
					currentUser ?
						<MenuList>
							<MenuItem
								icon={<AddIcon />}
								command="⌘N"
								onClick={() => {
									setModalType(ModalType.NewQuestion)
									disclosure.onOpen()
								}}
							>
								質問の作成
							</MenuItem>
							<MenuItem
								icon={<EditIcon />}
								command="⌘E"
							>
								質問の編集
							</MenuItem>
							<MenuItem
								icon={<AtSignIcon />}
								command="⌘P"
								onClick={() => {
									setModalType(ModalType.Profile)
									disclosure.onOpen()
								}}
							>
								プロフィール編集
							</MenuItem>
							<MenuItem
								icon={<Icon as={HiLogout}/>}
								onClick={() => {
									setModalType(ModalType.Logout)
									disclosure.onOpen()
								}}
							>
								ログアウト
							</MenuItem>
						</MenuList>:
						<MenuList>
							<MenuItem
								icon={<Icon as={HiLogin}/>}
								onClick={() => {
									setModalType(ModalType.Login)
									disclosure.onOpen()
								}}
							>
								ログイン
							</MenuItem>
							<MenuItem
								icon={<Icon as={HiUserAdd}/>}
								onClick={() => {
									setModalType(ModalType.Signup)
									disclosure.onOpen()
								}}
							>
								サインアップ
							</MenuItem>
						</MenuList>
				}
			</Menu>
			<ModalWrapper modalType={modalType} disclosure={disclosure} />
		</Flex>
	)
}

export default Header;