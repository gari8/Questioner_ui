import { FC } from 'react'
import { User } from '../../generated/graphql'
import { useHistory } from 'react-router'
import { Avatar, Flex, Text } from '@chakra-ui/react'

interface Props {
    user: User
}

const MiniUserCard: FC<Props> = ({ user }) => {
    const history = useHistory()
    return (
        <Flex
            borderRadius={['none','md']}
            boxShadow={['none','md']}
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
                history.push('/user/' + user.id)
            }}
        >
            <Flex justify={'center'} flexDirection={'column'}>
                <Avatar name={user.username} src={user.icon!} size={'sm'}/>
            </Flex>
            <Flex justify={'center'} flexDirection={'column'} mx={2} w={'100%'}>
                <Text fontWeight={'black'} fontSize={'sm'}>{user.username}</Text>
            </Flex>
            <Flex justify={'center'} flexDirection={'column'} mx={1} w={'50px'}>
                <Text fontSize={'xs'} textAlign={'right'}>Q. {user.questionCount}</Text>
                <Text fontSize={'xs'} textAlign={'right'}>A. {user.answerCount}</Text>
            </Flex>
        </Flex>
    )
}

export default MiniUserCard;