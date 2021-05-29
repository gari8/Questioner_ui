import {FC} from "react";
import {
	Box,
	Flex, IconButton,
	Image,
	Input,
	InputGroup,
	InputLeftElement, Menu, MenuButton,
	MenuItem,
	MenuList,
	Spacer
} from "@chakra-ui/react";
import {
	AddIcon,
	EditIcon,
	ExternalLinkIcon,
	HamburgerIcon,
	RepeatIcon,
	SearchIcon
} from "@chakra-ui/icons";
import Logo from "statics/logo.jpeg";

const Header: FC = () => {
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
					<MenuItem icon={<AddIcon />} command="⌘T">
						New Tab
					</MenuItem>
					<MenuItem icon={<ExternalLinkIcon />} command="⌘N">
						New Window
					</MenuItem>
					<MenuItem icon={<RepeatIcon />} command="⌘⇧N">
						Open Closed Tab
					</MenuItem>
					<MenuItem icon={<EditIcon />} command="⌘O">
						Open File...
					</MenuItem>
				</MenuList>
			</Menu>
		</Flex>
	)
}

export default Header;