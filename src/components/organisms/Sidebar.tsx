import React, { FC, useContext } from 'react'
import { Avatar, Box, IconButton, Tooltip, useDisclosure } from '@chakra-ui/react'
import { useHistory } from 'react-router'
import { AuthContext } from '../../contexts/Auth'
import { Search2Icon } from '@chakra-ui/icons'
import { ImHome3 } from 'react-icons/im'
import SearchInputModal from './SearchInputModal'

const Sidebar: FC = () => {
    const history = useHistory()
    const { currentUser } = useContext(AuthContext)
    const disclosure = useDisclosure()

    return (
        <Box
            position={'fixed'}
            top={16}
            bg={'white'}
            zIndex={10}
            minHeight={'calc(100vh - 216px)'}
            borderRight={'1px'}
            borderColor={'gray.200'}
            display={['none', 'block']}
        >
            <Box h={12} bg={'gray.200'}> </Box>
            <Box w={'full'} px={2} pt={2}>
                <Tooltip hasArrow label={'ホーム'} bg={'black'} color={'white'}>
                    <IconButton
                        icon={<ImHome3 />} aria-label={'top'} bg={'inherit'} _focus={{ outline: 0 }}
                        _hover={{ color: 'gray.500' }} onClick={() => history.push('/')}
                    />
                </Tooltip>
                <hr style={{ width: '90%', margin: '6px auto' }} />
                <Tooltip hasArrow label={'検索'} bg={'black'} color={'white'}>
                    <IconButton
                        icon={<Search2Icon />} aria-label={'top'} bg={'inherit'} _focus={{ outline: 0 }}
                        _hover={{ color: 'gray.500' }} onClick={disclosure.onOpen}
                    />
                </Tooltip>
                <hr style={{ width: '90%', margin: '6px auto' }} />
                <Tooltip hasArrow label={'マイページ'} bg={'black'} color={'white'}>
                    <Avatar
                        display={'block'}
                        mx={'auto'}
                        m={1}
                        size={'sm'}
                        name={currentUser ? currentUser.username : ''}
                        src={currentUser ? currentUser.icon! : ''}
                        onClick={() => currentUser ? history.push('/user/' + currentUser.id) : history.push('/')}
                        _hover={{ opacity: 0.8 }}
                        cursor={'pointer'}
                    />
                </Tooltip>
                <hr style={{ width: '90%', margin: '6px auto' }} />
            </Box>
            <SearchInputModal disclosure={disclosure} />
        </Box>
    )
}

export default Sidebar