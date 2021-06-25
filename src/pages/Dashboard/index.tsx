import { FC, useContext } from 'react'
import {Avatar, Box, Flex, Text} from "@chakra-ui/react";
import {useHistory} from "react-router";
import { AuthContext } from '../../contexts/Auth'

const Dashboard: FC = () => {
	const history = useHistory()
	const { currentUser } = useContext(AuthContext)
	if (!currentUser) history.push("/");

	return (
		<Box>
			<Flex py={10} bg={"gray.200"} justify={"center"}>
				<Box>
					<Avatar size={"xl"} display={'block'} mx={'auto'} name={currentUser?.username} src={currentUser?.icon!} />
					<Text fontSize={'2xl'} mt={4} textAlign={'center'} fontWeight={"black"}>{currentUser?.username}</Text>
				</Box>
			</Flex>
			<Flex justify={'center'} py={6}>
				<Text fontSize={"sm"} fontWeight={"light"}>{currentUser?.description}</Text>
			</Flex>
		</Box>
	)
}

export default Dashboard;