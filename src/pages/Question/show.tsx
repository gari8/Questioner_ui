import { FC, useContext } from 'react'
import { useLocation } from "react-router-dom"
import { Avatar, Box, Flex, Heading, Text, Tooltip } from '@chakra-ui/react'
import { useQuery } from '@apollo/client'
import { FIND_QUESTION } from '../../types/gqls'
import AnswerField from '../../components/templates/AnswerField'
import { Answer, AnswerType, User } from '../../generated/graphql'
import { parseDate } from '../../utilities/parsers'
import { useHistory } from 'react-router'
import { AuthContext } from '../../contexts/Auth'

const QuestionShow: FC = () => {
	const { currentUser } = useContext(AuthContext)
	const history = useHistory()
	const { pathname } = useLocation()
	const qId = pathname.replace("/question/", "")
	const { loading, data } = useQuery(FIND_QUESTION, {
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
					<Text>{parseDate(data.findQuestion.termStart!) || parseDate(data.findQuestion.termEnd!) ? `回答期限: ${parseDate(data.findQuestion.termStart!)} ~ ${parseDate(data.findQuestion.termEnd!)}` : "期限なし"}</Text>
					<Text my={1}>回答数:  {data.findQuestion.answerCount}</Text>
				</Flex>
			</Flex>
			<Flex py={4} pl={6} pr={20}>
				<Flex flexDirection={"column"} justify={"center"} px={4} py={8} borderRadius={'md'} _hover={{ bg: "gray.200" }} onClick={() => history.push("/user/"+data.findQuestion.user.id)}>
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
			<AnswerField question={data.findQuestion} isLogin={currentUser !== null} />
			<Heading as={"h3"} fontWeight={"black"} p={4}>Answerers.</Heading>
			{
				data.findQuestion &&
				data.findQuestion.answerType === AnswerType.Select ?
					<>
						{
							data.findQuestion.answerers &&
							<>
								<Heading as={"h3"} fontWeight={"black"} p={4}>Answerers.</Heading>
								<Box>
									<Flex mx={"auto"} w={"50%"} wrap={"wrap-reverse"} justify={"center"} pt={6} pb={12}>
										{

											data.findQuestion.answerers!.map((answerer: User, index: number) => {
												return <Tooltip hasArrow label={answerer.username} bg={"black"} color={"white"} key={answerer.username+index} >
													<Avatar m={1} name={answerer.username} src={answerer.icon!} />
												</Tooltip>
											})
										}
									</Flex>
								</Box>
							</>
						}
					</>
					:
					<>
						{
							data.findQuestion.answers &&
							data.findQuestion.answers.map((v: Answer, i: number) => {
								return <p key={i}>{v.content}</p>
							})
						}
					</>
			}
		</Box>
	)
}

export default QuestionShow;