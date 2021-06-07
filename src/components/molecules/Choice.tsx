import {Button, Flex, Progress, Text} from "@chakra-ui/react";
import {FC} from "react";
import {ChoiceInterface} from "../../types";

interface Props {
	choice: ChoiceInterface
	answered: boolean
	handleSendAnswer: (choice: ChoiceInterface) => void
}

const Choice: FC<Props> = ({ choice, answered, handleSendAnswer }) => {

	return (
		<>
			<Flex my={4} mx={20} justify={"space-between"}>
				<Button
					disabled={answered}
					_focus={{ outline: 0}}
					onClick={() => handleSendAnswer(choice)}
				>
					{choice.content}
				</Button>
				{
					answered ?
						<Flex>
							<Flex flexDirection={"column"} justify={"center"} transition={"all .5s"} mx={2}>
								<Text fontSize={"lg"} fontWeight={"black"}>{choice.value}%</Text>
							</Flex>
							<Flex flexDirection={"column"} justify={"center"} transition={"all .5s"}>
								<Progress w={"500px"} colorScheme={"green"} size={"lg"} value={choice.value} hasStripe/>
							</Flex>
						</Flex>
						:
						<></>
				}
			</Flex>
		</>
	)
}

export default Choice;