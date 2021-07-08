import { FC } from 'react'
import { User } from '../../generated/graphql'
import { Avatar, Box, Flex, Text, Tooltip } from '@chakra-ui/react'
import { useHistory } from 'react-router'

interface Props {
    user: User
}

const UserCard: FC<Props> = ({ user }) => {
    const barcode: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    const history = useHistory()
    return (
        <Box
            borderRadius={'md'}
            bg={'red.300'}
            mx={4}
            my={4}
            w={'280px'}
            boxShadow={'lg'}
            position={'relative'}
            pb={10}
            _hover={{ boxShadow: 'none' }}
            onClick={() => history.push("/user/"+user.id)}
        >
            <Flex m={10}>
                <Flex flexDirection={'column'} justify={'center'}>
                    <Tooltip hasArrow label={user.username}>
                        <Avatar name={user.username} src={user.icon!}/>
                    </Tooltip>
                </Flex>
                <Box ml={6} w={'full'}>
                    <Text
                        // bg={'white'}
                        color={'gray.50'}
                        fontWeight={'black'}
                        borderRadius={'sm'}
                        w={'full'}
                        py={0.5}
                        textAlign={'center'}
                    >{user.username}</Text>
                    <Flex px={2} my={1} justify={'center'}>
                        <Flex>
                            <Text fontWeight={'black'} mx={1}>Q.</Text>
                            <Text>{user.questionCount}</Text>
                        </Flex>
                        <Flex ml={6}>
                            <Text fontWeight={'black'} mx={1}>A.</Text>
                            <Text>{user.answerCount}</Text>
                        </Flex>
                    </Flex>
                </Box>
            </Flex>
            <Flex position={'absolute'} bottom={'0'} w={'full'} h={10} bg={'gray.50'} borderWidth={'2px'} borderColor={'red.300'} borderRadius={'0 0 5px 5px'} pt={4}>
                {
                    barcode.map((_, index: number) => {
                        return <Box h={index % 4 !== 0 ? 5 : 2} mt={index % 4 !== 0 ? 0 : 3} w={'7px'} bg={'red.300'} mx={2} key={index}> </Box>
                    })
                }
            </Flex>
        </Box>
    )
}

export default UserCard;