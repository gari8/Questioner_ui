import { FC, useContext, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Avatar, Box, Flex, Heading, IconButton, Text, Tooltip, useDisclosure } from '@chakra-ui/react'
import { useLazyQuery } from '@apollo/client'
import { FIND_QUESTION } from '../../types/gqls'
import AnswerField from '../../components/templates/AnswerField'
import { parseDate } from '../../utilities/parsers'
import { useHistory } from 'react-router'
import { AuthContext } from '../../contexts/Auth'
import AnswerList from '../../components/templates/AnswerList'
import Loading from '../../components/templates/Loading'
import Error from '../../components/templates/Error'
import { FiEdit } from 'react-icons/fi'
import EditQuestionModal from '../../components/organisms/EditQuestionModal'

const QuestionShow: FC = () => {
    const { currentUser } = useContext(AuthContext)
    const history = useHistory()
    const { pathname } = useLocation()
    const disclosure = useDisclosure()
    const qId = pathname.replace('/question/', '')

    const [getQuestion , { loading, error, data }] = useLazyQuery(FIND_QUESTION, {
        variables: { id: qId, userId: currentUser?.id! },
    })

    useEffect(() => {
        let isMounted = true;
        if (isMounted) {
            getQuestion({ variables: { id: qId, userId: currentUser?.id! } })
        }
        return () => {
            isMounted = false;
        };
    }, [qId, currentUser?.id, getQuestion])

    if (loading) {
        return <Loading />
    }

    if (error) {
        return <Error />
    }

    return data ? (
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
                                <IconButton
                                    aria-label={'edit question'}
                                    icon={<FiEdit />}
                                    fontSize={'2xl'}
                                    color={'gray.50'}
                                    mx={2}
                                    fontWeight={'bold'}
                                    cursor={'pointer'}
                                    bg={'inherit'}
                                    _hover={{ color: 'gray.200' }}
                                    _focus={{ outline: 0 }}
                                    onClick={() => {
                                        if (currentUser.id === data.findQuestion.user.id) {
                                            disclosure.onOpen()
                                        }
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
            <AnswerField question={data.findQuestion} getQuestion={getQuestion} currentUser={currentUser!} />
            <AnswerList answers={data.findQuestion.answers} answerers={data.findQuestion.answerers}
                        answerType={data.findQuestion.answerType} />
            <EditQuestionModal disclosure={disclosure} />
        </Box>
    ) : <></>
}

export default QuestionShow