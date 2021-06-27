import { FC } from 'react'
import { Avatar, Box, Flex, Heading, Tooltip } from '@chakra-ui/react'
import { Answer, AnswerType, Question, User } from '../../generated/graphql'

interface Props {
    question: Question
}

const AnswerList: FC<Props> = ({ question }) => {
    return (
        <>
            <Heading as={"h3"} fontWeight={"black"} p={4}>Answerers.</Heading>
            {
                question &&
                question.answerType === AnswerType.Select ?
                    <>
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
                    :
                    <>
                        {
                            question.answers &&
                            question.answers.map((v: Answer, i: number) => {
                                return <p key={i}>{v.content}</p>
                            })
                        }
                    </>
            }
        </>
    )
}

export default AnswerList;