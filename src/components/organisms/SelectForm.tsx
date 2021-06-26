import { FC } from 'react'
import { Choice, Question, User } from '../../generated/graphql'
import { Avatar, Box, Flex, Heading, Tooltip } from '@chakra-ui/react'
import ChoiceItem from '../molecules/ChoiceItem'

interface Props {
    question: Question
    handleSubmit: (choice: Choice) => void
    flag: boolean
}

const SelectForm: FC<Props> = ({ question, handleSubmit, flag }) => {
    return (
        <>
            {
                question.choices &&
                <>
                    <Heading as={"h3"} fontWeight={"black"} p={4}>Choices.</Heading>
                    {
                        question.choices?.map((choice: Choice, index: number) => {
                            return <ChoiceItem choice={choice} answered={flag} key={choice.content+index} handleSendAnswer={handleSubmit} />
                        })
                    }
                    <hr />
                </>
            }
            {
                question.answerers &&
                <>
                    <Heading as={"h3"} fontWeight={"black"} p={4}>Answerers.</Heading>
                    <Box>
                        <Flex mx={"auto"} w={"50%"} wrap={"wrap-reverse"} justify={"center"} pt={6} pb={12}>
                            {

                                question.answerers!.map((answerer: User, index: number) => {
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
    )
}

export default SelectForm;