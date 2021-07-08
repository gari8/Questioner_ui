import { FC} from 'react'
import { Avatar, Box, Flex, Grid, GridItem, Text } from '@chakra-ui/react'
import { useLocation } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { FIND_USER } from '../../types/gqls'
import Loading from '../../components/templates/Loading'

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
                    <Flex justify={'center'} py={6}>
                        <Text fontSize={'sm'} fontWeight={'light'}>{data.findUser.description}</Text>
                    </Flex>
                    <Grid templateColumns={'repeat(2, 1fr)'}>
                        <GridItem colSpan={2} h={20} bg={'yellow.400'}>
                            aaaaa
                        </GridItem>
                        <GridItem colStart={3} colEnd={6} h={20} bg={'yellow.100'}>
                            bbbbbb
                        </GridItem>
                        {/*<Box w={'100%'} bg={'yellow'} h={20}></Box>*/}
                        {/*<Box w={'100%'} bg={'yellowgreen'}></Box>*/}
                    </Grid>
                </>
            }
        </Box>
    )
}

export default UserShow;