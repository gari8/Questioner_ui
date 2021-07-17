import { FC } from 'react'
import { Avatar, Box, Flex, Text, Tooltip } from '@chakra-ui/react'
import { useHistory } from 'react-router'
import { AnswerType, Question } from '../../generated/graphql'
import { parseDate } from '../../utilities/parsers'
import AnswerTypeIcon from '../atoms/AnswerTypeIcon'

interface Props {
    question: Question
}

const QuestionCard: FC<Props> = ({ question }) => {
    const history = useHistory()
    return (
        <Box borderRadius={[0, 4]} minH={['100px', '200px']} w={['100%', '90%']} boxShadow={['none', 'md']} my={[1, 2, 4]} pb={['30px', '60px']} position={'relative'}
             cursor={'pointer'}
             mx={'auto'}
             _hover={{ opacity: 0.8 }}
             maxH={'280px'}
             onClick={() => {
                 history.push('/question/' + question.id)
             }}
        >
            <Box position={'absolute'} top={[1,2]} right={[1,2]} w={7} h={7} transform={['scale(0.5)', 'scale(1.0)']}>
                <AnswerTypeIcon answerType={question.answerType as AnswerType} />
            </Box>
            <Flex flexDirection={'column'} justify={'center'} px={[4, 6]} minH={['80px', '140px']} backgroundColor={'gray.200'}
                  borderRadius={['none', '5px 5px 0 0']} >
                <Text textAlign={'left'} fontSize={['xx-small', 'lg']} wordBreak={'break-word'} fontWeight={'bold'} mt={[1, 4]} mb={1}>{question.title}</Text>
                <Text textAlign={'left'} fontSize={['xx-small', 'sm']} wordBreak={'break-word'} fontWeight={'light'} my={[1, 4]}>{question.content}</Text>
            </Flex>
            <Flex w={'full'} h={['30px', '60px']} justify={'space-between'} position={'absolute'} bottom={0} borderRadius={'0 0 5px 5px'}
                  px={[1, 3]}>
                <Flex h={['30px', '60px']} w={'full'} flexDirection={'column'} justify={'center'} mx={2}>
                    <Text fontSize={['xx-small', 'sm']}>回答数 {question.answerCount}</Text>
                    <Text fontSize={['xx-small', 'sm']}>{parseDate(question.termStart!) || parseDate(question.termEnd!) ? `${parseDate(question.termStart!)} ~ ${parseDate(question.termEnd!)}` : '期限なし'}</Text>
                </Flex>
                <Flex h={['30px', '60px']} w={'full'} justify={'flex-end'} mx={1}>
                    <Flex flexDirection={'column'} justify={'center'}>
                        <Text w={'full'} fontSize={['xx-small', 'sm']} mx={1} fontWeight={"hairline"}>By</Text>
                    </Flex>
                    <Flex flexDirection={'column'} justify={'center'}>
                        <Tooltip hasArrow label={question.user.username} bg={'black'} color={'white'}>
                            <Avatar size={'sm'} name={question.user.username} src={question.user.icon!} mx={'auto'} transform={['scale(0.7)', 'scale(1.0)']} />
                        </Tooltip>
                    </Flex>
                </Flex>
            </Flex>
        </Box>
    )
}

export default QuestionCard