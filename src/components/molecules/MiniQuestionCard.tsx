import { FC } from 'react'
import { AnswerType, Question } from '../../generated/graphql'
import { Avatar, Flex, Text } from '@chakra-ui/react'
import { useHistory } from 'react-router'
import AnswerTypeIcon from '../atoms/AnswerTypeIcon'

interface Props {
    question: Question
}

const MiniQuestionCard: FC<Props> = ({ question }) => {
    const history = useHistory()
    return (
        <Flex
            borderRadius={'md'}
            boxShadow={'md'}
            bg={'gray.50'}
            mx={'auto'}
            w={['100%', '90%', '90%']}
            my={[2, 4]}
            px={2}
            h={['70px']}
            maxH={'280px'}
            justify={'space-between'}
            _hover={{ opacity: 0.8 }}
            onClick={() => {
                history.push('/question/' + question.id)
            }}
        >
            <Flex justify={'center'} flexDirection={'column'}>
                <Avatar name={question.user.username} src={question.user.icon!} size={'sm'}/>
            </Flex>
            <Flex justify={'center'} flexDirection={'column'} mx={2} w={'100%'}>
                <Flex>
                    <Text fontWeight={'black'} fontSize={'sm'}>{question.title}</Text>
                    <Flex justify={'center'} flexDirection={'column'} mx={2}>
                        <AnswerTypeIcon answerType={question.answerType as AnswerType} size={16}/>
                    </Flex>
                </Flex>
                <Text fontWeight={'light'} fontSize={'xs'}>{question.content}</Text>
            </Flex>
            <Flex justify={'center'} flexDirection={'column'} mx={1} w={'50px'}>
                <Text textAlign={'right'} fontSize={'xs'}>A. {question.answerCount}</Text>
            </Flex>
        </Flex>
    )
}

export default MiniQuestionCard;