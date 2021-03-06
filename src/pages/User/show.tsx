import { FC, useEffect } from 'react'
import { Avatar, Box, Flex, SimpleGrid, Text } from '@chakra-ui/react'
import { useLocation } from 'react-router-dom'
import { useLazyQuery } from '@apollo/client'
import { FIND_USER } from '../../types/gqls'
import Loading from '../../components/templates/Loading'
import { Question } from '../../generated/graphql'
import QuestionCard from '../../components/molecules/QuestionCard'
import Error from '../../components/templates/Error'

const UserShow: FC = () => {
    const { pathname } = useLocation()
    const uId = pathname.replace('/user/', '')
    const [getUser, { loading, error, data }] = useLazyQuery(FIND_USER, {
        variables: { id: uId },
    })

    useEffect(() => {
        let isMounted = true;
        if (isMounted) {
            getUser({variables: { id: uId } })
        }
        return () => {
            isMounted = false;
        };
    }, [uId, getUser])

    if (loading) {
        return <Loading />
    }

    if (error) {
        return <Error />
    }

    return data ? (
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
                    <Flex px={[0, 4]} flexDirection={['column-reverse', 'column-reverse', 'row']}>
                        <Box w={['100%', '100%', '90%']}>
                            <SimpleGrid w={['100%', '100%','90%']} columns={1} mx={'auto'} spacingY={'auto'}>
                                {
                                    data.findUser.questions &&
                                    data.findUser.questions.map((q: Question, index: number) => {
                                        return <QuestionCard question={q} key={q.id + index.toString()} />
                                    })
                                }
                            </SimpleGrid>
                        </Box>
                        <Box w={['100%', '100%', '60%']} mx={'auto'} mb={6}>
                            <Box w={['100%', '90%']} mx={'auto'} my={4} p={4} borderRadius={['none','md']} boxShadow={['none','md']} bg={'gray.50'}>
                                <Text fontSize={'sm'} my={2} fontWeight={'light'}>??????????????????</Text>
                                <Text fontSize={['md', 'xl']} mt={4} textAlign={'center'}
                                      fontWeight={'black'}>{data.findUser.username}</Text>
                                <Text fontSize={'sm'} my={2} fontWeight={'light'}>ID</Text>
                                <Text fontSize={['md', 'xl']} mt={4} textAlign={'center'}
                                      fontWeight={'black'}>{data.findUser.id}</Text>
                                <Text fontSize={'sm'} my={2} fontWeight={'light'}>???????????????</Text>
                                <Text fontSize={['md', 'xl']} mt={4} textAlign={'center'}
                                      fontWeight={'black'}>{data.findUser.questionCount} ???</Text>
                                <Text fontSize={'sm'} my={2} fontWeight={'light'}>???????????????</Text>
                                <Text fontSize={['md', 'xl']} mt={4} textAlign={'center'}
                                      fontWeight={'black'}>{data.findUser.answerCount} ???</Text>
                            </Box>
                        </Box>
                    </Flex>
                </>
            }
        </Box>
    ) : <></>
}

export default UserShow;