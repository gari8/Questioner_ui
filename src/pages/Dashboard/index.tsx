import {FC} from "react";
import {Avatar, Box, Flex} from "@chakra-ui/react";
import {currentUser} from "../../utilities/items";
import {useHistory} from "react-router";

const Dashboard: FC = () => {
	const history = useHistory()
	if (!currentUser) history.push("/");

	return (
		<Box>
			<Flex py={10} bg={"gray.200"} justify={"center"}>
				<Avatar size={"xl"} name={currentUser?.username} src={currentUser?.icon} />
			</Flex>
		</Box>
	)
}

export default Dashboard;