import {FC, useState} from "react";
import {ChoiceInterface, QuestionInterface} from "../../types";
import {Avatar, Box, Flex, Heading, Text, Tooltip} from "@chakra-ui/react";
import Choice from "../../components/molecules/Choice";

const QuestionShow: FC = () => {

	const data = {
		question: testQuestion,
	}

	const [flag, setFlag] = useState<boolean>(data.question.answered!)

	const handleSendChoice = (choice: ChoiceInterface) => {
		setFlag(true)
	}

	return (
		<Box>
			<Flex bg={"lightGreen.700"} px={14} py={8} justify={"space-between"}>
				<Flex flexDirection={"column"} justify={"center"}>
					<Heading as={"h2"} color={"white"}>{data.question.title}</Heading>
				</Flex>
				<Flex flexDirection={"column"} justify={"center"}>
					<Text my={1}>回答方法:  {data.question.answerType}</Text>
					<Text>回答期限:  {data.question.term?.start} ~ {data.question.term?.end}</Text>
					<Text my={1}>回答数:  {data.question.responses}</Text>
				</Flex>
			</Flex>
			<Flex py={4} pl={6} pr={20}>
				<Flex flexDirection={"column"} justify={"center"} px={4} py={8}>
					<Avatar size={"lg"} name={data.question.user.username} icon={data.question.user.icon}/>
					<Text fontSize={"lg"} textAlign={"center"} fontWeight={"bold"}>{data.question.user.username}</Text>
				</Flex>
				<Flex flexDirection={"column"} justify={"start"} mx={6}>
					<Text fontSize={"2xl"} fontWeight={"black"}>Q.</Text>
				</Flex>
				<Flex flexDirection={"column"} justify={"center"} py={6}>
					<Text wordBreak={"break-word"}>{data.question.content}</Text>
				</Flex>
			</Flex>
			<hr />
			<Heading as={"h3"} fontWeight={"black"} p={4}>Choices.</Heading>
			{
				data.question.choices?.map((choice, index) => {
					return <Choice choice={choice} answered={flag} key={choice.content+index} handleSendAnswer={handleSendChoice} />
				})
			}
			<hr />
			<Heading as={"h3"} fontWeight={"black"} p={4}>Answerers.</Heading>
			<Box>
				<Flex mx={"auto"} w={"50%"} wrap={"wrap-reverse"} justify={"center"} pt={6} pb={12}>
					{
						data.question.answerers!.map((answerer, index) => {
							return <Tooltip hasArrow label={answerer.username} bg={"black"} color={"white"} key={answerer.username+index} >
								<Avatar m={1} name={answerer.username} src={answerer.icon} />
							</Tooltip>
						})
					}
				</Flex>
			</Box>
		</Box>
	)
}

export default QuestionShow;

const testQuestion: QuestionInterface = {
	id: '1234524',
	title: '朝ごはん何食べますか？',
	responses: 62,
	content: "普段から朝ごはんには何を食べていますか？",
	term: {
		start: "12-04:08:12",
		end: "12-04:10:12"
	},
	answerType: "select",
	answered: false,
	choices: [
		{ content: "パン", value: 20 },
		{ content: "ご飯", value: 21 },
		{ content: "プロテインのみ", value: 0.9 },
		{ content: "ケーキ", value: 12.8 },
		{ content: "その他お菓子", value: 0.5 },
		{ content: "味噌汁のみ", value: 0.8 },
		{ content: "飲み物のみ", value: 12 },
		{ content: "食べない", value: 32 },
	],
	user: {
		username: 'jimmy',
		icon: '',
	},
	answerers: [
		{
			username: 'mike',
			icon: '',
		},
		{
			username: 'kamila',
			icon: '',
		},
		{
			username: 'mike',
			icon: '',
		},
		{
			username: 'mike',
			icon: '',
		},
		{
			username: 'mike',
			icon: '',
		},
		{
			username: 'mike',
			icon: '',
		},
		{
			username: 'mike',
			icon: '',
		},
		{
			username: 'kamila',
			icon: '',
		},
		{
			username: 'kamila',
			icon: '',
		},
		{
			username: 'kamila',
			icon: '',
		},
		{
			username: 'kamila',
			icon: '',
		},
		{
			username: 'kamila',
			icon: '',
		},
		{
			username: 'charlotte',
			icon: '',
		},
	]
}