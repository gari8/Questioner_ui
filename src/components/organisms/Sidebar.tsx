import React, { FC, useContext } from 'react'
import { Avatar, Box, Tooltip } from '@chakra-ui/react'
import { useHistory } from 'react-router'
import { AuthContext } from '../../contexts/Auth'
import { Search2Icon } from '@chakra-ui/icons'

const Sidebar: FC = () => {
    const history = useHistory()
    const { currentUser } = useContext(AuthContext)

    return (
        <Box
            minHeight={'calc(100vh - 216px)'}
            borderRight={'1px'}
            borderColor={'gray.200'}
            display={['none', 'block']}
        >
            <Box h={12} bg={'gray.200'}> </Box>
            <Box w={'full'} px={2} pt={2}>
                <Tooltip hasArrow label={'検索'} bg={'black'} color={'white'}>
                    <Search2Icon mx={'auto'} display={'block'} h={8} _hover={{ color: 'gray.500' }} />
                </Tooltip>
                <hr style={{ width: '90%', margin: '6px auto' }} />
                <Tooltip hasArrow label={'マイページ'} bg={'black'} color={'white'}>
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
                <Tooltip hasArrow label={'質問'} bg={'black'} color={'white'}>
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
        </Box>
    )
}

export default Sidebar