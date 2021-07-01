import { FC } from 'react'
import { Answer, AnswerType } from '../../generated/graphql'
import { Avatar, Flex, Text, Tooltip } from '@chakra-ui/react'
import { parseDate } from '../../utilities/parsers'

interface Props {
    answer: Answer
    answerType: AnswerType
}

const AnswerCard: FC<Props> = ({ answer, answerType }) => {
    return (
        <Flex
            mx={'auto'}
            my={4}
            bg={'gray.50'}
            boxShadow={'sm'}
            _hover={{ boxShadow: 'md' }}
            transition={'all .4s'}
            w={'50%'}
            minW={'400px'}
            borderRadius={'lg'}
            justify={'space-between'}
        >
            <Flex>
                <Flex flexDirection={'column'} justify={'center'}>
                    <Tooltip hasArrow label={answer.user.username} placement={'top'}>
                        <Avatar size={'sm'} name={answer.user.username} src={answer.user.icon!} m={2} />
                    </Tooltip>
                </Flex>
                <Flex h={'full'} flexDirection={'column'} justify={'center'} py={2}>
                    <Text fontSize={'md'} wordBreak={'break-word'}>{answer.content}</Text>
                </Flex>
            </Flex>
            <Flex flexDirection={'column'} justify={'flex-end'}>
                <Text mx={1} fontSize={'sm'} color={'gray.500'}>{parseDate(answer.created_at!)}</Text>
            </Flex>
        </Flex>
    )
}

export default AnswerCard;