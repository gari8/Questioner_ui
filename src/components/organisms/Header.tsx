import React, {FC} from "react";
import {
	Box,
	Flex, IconButton,
	Image,
	Input,
	InputGroup,
	InputLeftElement, Menu, MenuButton,
	MenuItem,
	MenuList,
	Spacer, useDisclosure
} from "@chakra-ui/react";
import {
	AddIcon, AtSignIcon,
	EditIcon,
	HamburgerIcon,
	SearchIcon
} from "@chakra-ui/icons";
import Logo from "statics/logo.jpeg";
import ProfileModal from "./ProfileModal";

const Header: FC = () => {
	const profileDisclosure = useDisclosure()
	return (
		<Flex
			as={"header"}
			width={"full"}
			shadow={"sm"}
			py={2}
			px={8}
		>
			<Box>
				<Image
					src={Logo}
					alt={"logo"}
					height={"40px"}
				/>
			</Box>
			<Spacer />
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
			<Menu>
				<MenuButton
					as={IconButton}
					aria-label="Options"
					icon={<HamburgerIcon />}
					variant="outline"
				/>
				<MenuList>
					<MenuItem icon={<AddIcon />} command="⌘N">
						質問の作成
					</MenuItem>
					<MenuItem icon={<EditIcon />} command="⌘E">
						質問の編集
					</MenuItem>
					<MenuItem
						icon={<AtSignIcon />}
						command="⌘P"
						onClick={profileDisclosure.onOpen}
					>
						プロフィール
					</MenuItem>
				</MenuList>
			</Menu>
			<ProfileModal profileDisclosure={profileDisclosure}/>
		</Flex>
	)
}

export default Header;