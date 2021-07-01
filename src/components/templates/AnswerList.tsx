import { FC } from 'react'
import { Avatar, Box, Flex, Heading, Tooltip } from '@chakra-ui/react'
import { Answer, AnswerType, User } from '../../generated/graphql'
import AnswerCard from '../molecules/AnswerCard'

interface Props {
    answerType: AnswerType
    answers?: Answer[]
    answerers?: User[]
}

const AnswerList: FC<Props> = ({ answers, answerers, answerType }) => {
    return (
        <>
            <Heading as={"h3"} fontWeight={"black"} p={4}>Answerers.</Heading>
            {
                answerType === AnswerType.Select ?
                    <>
                        {
                            answerers &&
                            <>
                                <Box>
                                    <Flex mx={"auto"} w={"50%"} wrap={"wrap-reverse"} justify={"center"} pt={6} pb={12}>
                                        {
                                            answerers!.map((answerer: User, index: number) => {
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
                            answers &&
                            answers.map((v: Answer, i: number) => {
                                return <AnswerCard answer={v} answerType={answerType} key={i}/>
                            })
                        }
                    </>
            }
        </>
    )
}

export default AnswerList;