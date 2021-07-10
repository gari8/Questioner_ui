import { FC} from 'react'
import { Avatar, Box, Flex, SimpleGrid, Text } from '@chakra-ui/react'
import { useLocation } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { FIND_USER } from '../../types/gqls'
import Loading from '../../components/templates/Loading'
import { Question } from '../../generated/graphql'
import MiniQuestionCard from '../../components/molecules/MiniQuestionCard'

const UserShow: FC = () => {
    // const history = useHistory()
    const { pathname } = useLocation()
    const uId = pathname.replace('/user/', '')
    const { loading, error, data } = useQuery(FIND_USER, {
        variables: { id: uId },
    })

    // const { currentUser } = useContext(AuthContext)

    if (loading) {
        return <Loading />
    }

    if (error) {
        return <>{error}</>
    }

    return (
        <Box>
            {
                data.findUser &&
                <>
                    <Flex py={10} bg={'gray.200'} justify={'center'}>
                        <Box>
                            <Avatar size={'xl'} display={'block'} mx={'auto'} name={data.findUser.username}
                                    src={data.findUser.icon!} />
                            <Text fontSize={'2xl'} mt={4} textAlign={'center'}
                                  fontWeight={'black'}>{data.findUser.username}</Text>
                        </Box>
                    </Flex>
                    <Flex justify={'center'} py={6} px={4}>
                        <Text fontSize={'sm'} fontWeight={'light'}>{data.findUser.description}</Text>
                    </Flex>
                    <Flex px={4} flexDirection={['column-reverse', 'row']}>
                        <SimpleGrid w={'90%'} columns={[1, 1, 2]} mx={'auto'} spacingY={'auto'}>
                            {
                                data.findUser.questions &&
                                data.findUser.questions.map((q: Question, index: number) => {
                                    return <MiniQuestionCard question={q} key={q.id + index.toString()} />
                                })
                            }
                        </SimpleGrid>
                        <Box w={['100%', '50%']} mx={'auto'} mb={6}>
                            <Box w={'90%'} mx={'auto'} my={4} p={4} borderRadius={'md'} boxShadow={'md'} bg={'gray.50'}>
                                <Text fontSize={'sm'} my={2} fontWeight={'light'}>ニックネーム</Text>
                                <Text fontSize={['md', 'xl']} mt={4} textAlign={'center'}
                                      fontWeight={'black'}>{data.findUser.username}</Text>
                                <Text fontSize={'sm'} my={2} fontWeight={'light'}>ID</Text>
                                <Text fontSize={['md', 'xl']} mt={4} textAlign={'center'}
                                      fontWeight={'black'}>{data.findUser.id}</Text>
                                <Text fontSize={'sm'} my={2} fontWeight={'light'}>質問作成数</Text>
                                <Text fontSize={['md', 'xl']} mt={4} textAlign={'center'}
                                      fontWeight={'black'}>{data.findUser.questionCount} 個</Text>
                                <Text fontSize={'sm'} my={2} fontWeight={'light'}>回答した数</Text>
                                <Text fontSize={['md', 'xl']} mt={4} textAlign={'center'}
                                      fontWeight={'black'}>{data.findUser.answerCount} 回</Text>
                            </Box>
                        </Box>
                    </Flex>
                </>
            }
        </Box>
    )
}

export default UserShow;