import React, { FC, useContext } from 'react'
import { Avatar, Box, Button, Flex, Heading, Stack, Text, Tooltip, useBoolean } from '@chakra-ui/react'
import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons'
import { useHistory } from 'react-router'
import NavStack from '../molecules/NavStack'
import { AuthContext } from '../../contexts/Auth'

const Sidebar: FC = () => {
    const [isOpen, setIsClose] = useBoolean(false)
    const history = useHistory()
    const { currentUser } = useContext(AuthContext)

    return (
        <Box
            minHeight={'calc(100vh - 216px)'}
            borderRight={'1px'}
            borderColor={'gray.200'}
            display={['none', 'block']}
        >
            <Flex justify={'flex-end'} bg={'gray.100'} w={'full'}>
                <Button
                    _focus={{ outline: 0 }}
                    onClick={setIsClose.toggle}
                >
                    {
                        isOpen ?

                            <ArrowLeftIcon />
                            :
                            <ArrowRightIcon />
                    }
                </Button>
            </Flex>
            {
                isOpen ?
                    <Box w={'280px'}>
                        <Flex m={2} p={2} _hover={{ bg: 'gray.200', borderRadius: '5px' }} onClick={() => {
                            if (currentUser) history.push('/user/' + currentUser.id)
                        }}>
                            <Avatar size={'lg'} name={currentUser ? currentUser.username : ''}
                                    src={currentUser ? currentUser.icon! : ''} />
                            <Flex ml={6} mr={2} flexDirection={'column'} justify={'center'}>
                                {
                                    currentUser ?
                                        <Stack>
                                            <Text fontWeight={'bold'}>{currentUser.username}</Text>
                                            <Text fontSize={6} wordBreak={'break-word'}
                                                  fontWeight={'light'}>{currentUser.description}</Text>
                                        </Stack>
                                        :
                                        <Button _focus={{ outline: 0 }}>ログイン</Button>
                                }
                            </Flex>
                        </Flex>
                        <hr style={{ width: '90%', margin: '8px auto' }} />
                        <Heading as={'h5'} fontSize={'18px'} my={4} px={8}>ページリンク</Heading>
                        <NavStack />
                    </Box>
                    :
                    <Box w={'full'} pt={2}>
                        <Tooltip hasArrow label={'dashboard'} bg={'black'} color={'white'}>
                            <Avatar
                                display={'block'}
                                mx={'auto'}
                                size={'sm'}
                                name={currentUser ? currentUser.username : ''}
                                src={currentUser ? currentUser.icon! : ''}
                                onClick={() => currentUser ? history.push('/user/' + currentUser.id) : history.push('/')}
                                _hover={{ opacity: 0.8 }}
                                cursor={'pointer'}
                            />
                        </Tooltip>
                        <hr style={{ width: '90%', margin: '6px auto' }} />
                        <Tooltip hasArrow label={'question'} bg={'black'} color={'white'}>
                            <Avatar
                                display={'block'}
                                mx={'auto'}
                                size={'sm'}
                                name={'Question'}
                                onClick={() => history.push('/question')}
                                _hover={{ opacity: 0.8 }}
                                cursor={'pointer'}
                                bg={'blue.500'}
                            />
                        </Tooltip>
                        <hr style={{ width: '90%', margin: '6px auto' }} />
                    </Box>
            }
        </Box>
    )
}

export default Sidebar