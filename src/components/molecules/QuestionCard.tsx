import { FC } from 'react'
import { Avatar, Box, Flex, Text, Tooltip } from '@chakra-ui/react'
import { useHistory } from 'react-router'
import { AnswerType, Question } from '../../generated/graphql'
import { parseDate } from '../../utilities/parsers'
import AnswerTypeIcon from '../atoms/AnswerTypeIcon'

interface Props {
    data: Question
}

const QuestionCard: FC<Props> = ({ data }) => {
    const history = useHistory()
    return (
        <Box borderRadius={'5px'} minH={'200px'} w={'280px'} boxShadow={'md'} m={4} pb={'60px'} position={'relative'}
             cursor={'pointer'}
             _hover={{ opacity: 0.8 }}
             onClick={() => {
                 history.push('/question/' + data.id)
             }}
        >
            <Box position={'absolute'} top={2} right={2} w={7} h={7}>
                <AnswerTypeIcon answerType={data.answerType as AnswerType} />
            </Box>
            <Flex flexDirection={'column'} justify={'center'} h={'140px'} backgroundColor={'gray.200'}
                  borderRadius={'5px 5px 0 0'}>
                <Tooltip hasArrow label={data.user.username} bg={'black'} color={'white'}>
                    <Avatar name={data.user.username} src={data.user.icon!} mx={'auto'} />
                </Tooltip>
            </Flex>
            <Text textAlign={'center'} wordBreak={'break-word'} fontWeight={'bold'} my={4}>{data.title}</Text>
            <Flex w={'280px'} h={'60px'} justify={'right'} position={'absolute'} bottom={0} borderRadius={'0 0 5px 5px'}
                  px={3}>
                <Flex h={'60px'} w={'full'} flexDirection={'column'} justify={'center'}>
                    <Text w={'full'} fontSize={'sm'} textAlign={'right'}>回答数 {data.answerCount}</Text>
                    <Text w={'full'} fontSize={'sm'}
                          textAlign={'right'}>{parseDate(data.termStart!) || parseDate(data.termEnd!) ? `${parseDate(data.termStart!)} ~ ${parseDate(data.termEnd!)}` : '期限なし'}</Text>
                </Flex>
            </Flex>
        </Box>
    )
}

export default QuestionCard