import {FC} from "react";
import {Avatar, Box, Flex, Text, Tooltip} from "@chakra-ui/react";
import {QuestionInterface} from "../../types";
import {useHistory} from "react-router";

interface Props {
	data: QuestionInterface
}

const QuestionCard: FC<Props> = ({ data }) => {
	const history = useHistory()
	return (
		<Box borderRadius={"5px"} minH={"300px"} w={"280px"} boxShadow={"md"} m={4} pb={"60px"} position={"relative"} cursor={"pointer"}
		     _hover={{ opacity: 0.8 }}
		     onClick={() => {
		     	history.push("/question/"+data.id)
		     }}
		>
			<Flex flexDirection={"column"} justify={"center"} h={"140px"} backgroundColor={"gray.200"} borderRadius={"5px 5px 0 0"}>
				<Tooltip hasArrow label={data.user.username} bg={"black"} color={"white"}>
					<Avatar name={data.user.username} src={data.user.icon} mx={"auto"}/>
				</Tooltip>
			</Flex>
			<Text textAlign={"center"} wordBreak={"break-word"} fontWeight={"bold"} my={4}>{data.title}</Text>
			<Flex w={"280px"} h={"60px"} justify={"right"} position={"absolute"} bottom={0} borderRadius={"0 0 5px 5px"} px={3}>
				<Flex h={"60px"} w={"full"} flexDirection={"column"} justify={"center"}>
					<Text w={"full"} textAlign={"right"}>回答数  {data.responses}</Text>
					<Text w={"full"} textAlign={"right"}>期間  {data.term?.start} - {data.term?.end}</Text>
				</Flex>
			</Flex>
		</Box>
	)
}

export default QuestionCard;