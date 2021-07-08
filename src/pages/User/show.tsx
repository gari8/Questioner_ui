import { FC} from 'react'
import { Avatar, Box, Flex, Text } from '@chakra-ui/react'
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
                </>
            }
        </Box>
    )
}

export default UserShow