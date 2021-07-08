import { FC, useContext } from 'react'
import { useLocation } from 'react-router-dom'
import { Avatar, Box, Flex, Heading, Text, Tooltip } from '@chakra-ui/react'
import { useQuery } from '@apollo/client'
import { FIND_QUESTION } from '../../types/gqls'
import AnswerField from '../../components/templates/AnswerField'
import { parseDate } from '../../utilities/parsers'
import { useHistory } from 'react-router'
import { AuthContext } from '../../contexts/Auth'
import AnswerList from '../../components/templates/AnswerList'
import { SettingsIcon } from '@chakra-ui/icons'
import Loading from '../../components/templates/Loading'

const QuestionShow: FC = () => {
    const { currentUser } = useContext(AuthContext)
    const history = useHistory()
    const { pathname } = useLocation()
    const qId = pathname.replace('/question/', '')

    const { loading, error, data, refetch } = useQuery(FIND_QUESTION, {
        variables: { id: qId, userId: currentUser?.id! },
    })

    if (loading) {
        return <Loading />
    }

    if (error) {
        return <>{error}</>
    }

    return (
        <Box>
            <Flex bg={'lightGreen.700'} px={[3, 14]} py={[4, 8]} justify={'space-between'}>
                <Flex>
                    <Flex flexDirection={'column'} justify={'center'}>
                        <Heading as={'h2'} color={'white'} fontSize={['12px', '2xl']}>{data.findQuestion.title}</Heading>
                    </Flex>
                    <Flex flexDirection={'column'} justify={'center'}>
                        {
                            currentUser != null &&
                            currentUser.id === data.findQuestion.user.id &&
                            <Tooltip hasArrow label={'設定'} placement={'top'}>
                                <SettingsIcon
                                    fontSize={'2xl'}
                                    color={'gray.300'}
                                    mx={4}
                                    fontWeight={'bold'}
                                    cursor={'pointer'}
                                    _hover={{ textDecoration: 'underline', color: 'gray.100' }}
                                    onClick={() => {

                                    }}
                                />
                            </Tooltip>
                        }
                    </Flex>
                </Flex>
                <Flex flexDirection={'column'} justify={'center'}>
                    <Text my={1}>回答方法: {data.findQuestion.answerType}</Text>
                    <Text>{parseDate(data.findQuestion.termStart!) || parseDate(data.findQuestion.termEnd!) ? `回答期限: ${parseDate(data.findQuestion.termStart!)} ~ ${parseDate(data.findQuestion.termEnd!)}` : '期限なし'}</Text>
                    <Text my={1}>回答数: {data.findQuestion.answerCount}</Text>
                </Flex>
            </Flex>
            <Flex py={4} pl={[2, 6]} pr={[2, 20]} flexDirection={['column', 'row']}>
                <Flex flexDirection={'column'} justify={'center'} px={4} py={8} borderRadius={'md'}
                      _hover={{ bg: 'gray.200' }} onClick={() => history.push('/user/' + data.findQuestion.user.id)}>
                    <Avatar size={'lg'} display={'block'} mx={'auto'} name={data.findQuestion.user.username}
                            icon={data.findQuestion.user.icon} />
                    <Text mt={2} fontSize={'lg'} textAlign={'center'}
                          fontWeight={'bold'}>{data.findQuestion.user.username}</Text>
                </Flex>
                <Flex flexDirection={'column'} justify={'start'} mx={6}>
                    <Text fontSize={'2xl'} fontWeight={'black'}>Q.</Text>
                </Flex>
                <Flex flexDirection={'column'} justify={'center'} py={6} px={[6, 0]}>
                    <Text fontSize={['sm', 'lg']} wordBreak={'break-word'}>{data.findQuestion.content}</Text>
                </Flex>
            </Flex>
            <hr />
            <AnswerField question={data.findQuestion} refetch={refetch} currentUser={currentUser!} />
            <AnswerList answers={data.findQuestion.answers} answerers={data.findQuestion.answerers}
                        answerType={data.findQuestion.answerType} />
        </Box>
    )
}

export default QuestionShow