import {FC} from "react";
import {Box, Flex, Heading} from "@chakra-ui/react";
import {testData} from "../../utilities/items";
import QuestionCard from "../../components/molecules/QuestionCard";
import {QuestionInterface} from "../../types";

const QuestionIndex: FC = () => {
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
					testData.map((data: QuestionInterface, index: number) => {
						return <QuestionCard key={index} data={data} />
					})
				}
			</Flex>
		</Box>
	)
}

export default QuestionIndex;