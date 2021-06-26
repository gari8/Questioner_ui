import { FC } from 'react'
import { useLocation } from "react-router-dom"
import {Avatar, Box, Flex, Heading, Text} from "@chakra-ui/react";
import { useQuery } from '@apollo/client'
import { FIND_QUERY } from '../../types/gqls'
import AnswerField from '../../components/templates/AnswerField'

const QuestionShow: FC = () => {
	const { pathname } = useLocation()
	const qId = pathname.replace("/question/", "")
	const { loading, data } = useQuery(FIND_QUERY, {
		variables: { id: qId }
	})

	if (loading) {
		return <Box>Loading</Box>
	}

	return (
		<Box>
			<Flex bg={"lightGreen.700"} px={14} py={8} justify={"space-between"}>
				<Flex flexDirection={"column"} justify={"center"}>
					<Heading as={"h2"} color={"white"}>{data.findQuestion.title}</Heading>
				</Flex>
				<Flex flexDirection={"column"} justify={"center"}>
					<Text my={1}>回答方法:  {data.findQuestion.answerType}</Text>
					{/*<Text>回答期限:  {data.findQuestion.term?.start} ~ {data.findQuestion.term?.end}</Text>*/}
					{/*<Text my={1}>回答数:  {data.findQuestion.responses}</Text>*/}
				</Flex>
			</Flex>
			<Flex py={4} pl={6} pr={20}>
				<Flex flexDirection={"column"} justify={"center"} px={4} py={8}>
					<Avatar size={"lg"} display={'block'} mx={'auto'} name={data.findQuestion.user.username} icon={data.findQuestion.user.icon}/>
					<Text mt={2} fontSize={"lg"} textAlign={"center"} fontWeight={"bold"}>{data.findQuestion.user.username}</Text>
				</Flex>
				<Flex flexDirection={"column"} justify={"start"} mx={6}>
					<Text fontSize={"2xl"} fontWeight={"black"}>Q.</Text>
				</Flex>
				<Flex flexDirection={"column"} justify={"center"} py={6}>
					<Text wordBreak={"break-word"}>{data.findQuestion.content}</Text>
				</Flex>
			</Flex>
			<hr />
			<AnswerField question={data.findQuestion} />
		</Box>
	)
}

export default QuestionShow;