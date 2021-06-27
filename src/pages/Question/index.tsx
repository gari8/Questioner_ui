import {FC} from "react";
import {Box, Flex, Heading} from "@chakra-ui/react";
import QuestionCard from "../../components/molecules/QuestionCard";
import { useQuery } from '@apollo/client'
import { GET_QUESTIONS } from '../../types/gqls'
import { Question } from '../../generated/graphql'

const QuestionIndex: FC = () => {
	const { loading, data } = useQuery(GET_QUESTIONS, {
		variables: { limit: 12, offset: 0 }
	})

	if (loading) {
		return <Box>Load</Box>
	}

	return (
		<Box
			p={4}
		>
			<Heading
				as={"h2"}
				size={"md"}
			>
				公開中の質問
			</Heading>
			<Flex
				flexWrap={"wrap"}
				justify={"left"}
			>
				{
					data.questions &&
					data.questions.map((data: Question, index: number) => {
						return <QuestionCard key={index} data={data} />
					})
				}
			</Flex>
		</Box>
	)
}

export default QuestionIndex;