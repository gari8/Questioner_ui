import React, { FC } from 'react'
import { Avatar, Box, Flex, Text } from '@chakra-ui/react'
import { useHistory } from 'react-router'

const NavStack: FC = () => {
    const history = useHistory()
    return (
        <Box>
            <Flex
                onClick={() => history.push('/question')}
                _hover={{ bg: 'gray.200' }}
                p={4}
                mx={6}
                minW={'50%'}
                borderRadius={'5px'}
            >
                <Avatar
                    display={'block'}
                    size={'sm'}
                    name={'Question'}
                    cursor={'pointer'}
                    bg={'blue.500'}
                />
                <Flex flexDirection={'column'} justify={'center'} ml={2}>
                    <Text fontWeight={'bold'}>質問</Text>
                </Flex>
            </Flex>
            <hr style={{ width: '90%', margin: '8px auto' }} />
        </Box>
    )
}

export default NavStack