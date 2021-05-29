import React, {FC, ReactNode} from "react";
import Header from "../organisms/Header";
import {Box, Flex} from "@chakra-ui/react";
import Footer from "../organisms/Footer";
import Sidebar from "../organisms/Sidebar";

interface Props {
	children?: ReactNode
}

const MainFrame: FC<Props> = ({children}) => {
	return (
		<Box
			position={"relative"}
			pb={40}
			minHeight={"100vh"}
		>
			<Header />
			<Flex
				width={"full"}
			>
				<Sidebar>

				</Sidebar>
				<Box
					p={4}
				>
					{children}
				</Box>
			</Flex>
			<Footer />
		</Box>
	)
}

export default MainFrame;