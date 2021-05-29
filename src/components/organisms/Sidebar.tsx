import React, {FC, ReactNode} from "react";
import {Box} from "@chakra-ui/react";

interface Props {
	children?: ReactNode
}

const Sidebar: FC<Props> = ({ children }) => {
	return (
		<Box
			width={1/5}
			minHeight={"calc(100vh - 216px)"}
			borderRight={"1px"}
			borderColor={"gray.200"}
		>
			{children}
		</Box>
	)
}

export default Sidebar;