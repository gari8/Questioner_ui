import React, { FC, useContext } from 'react'
import { Avatar, Flex, Tooltip, useDisclosure } from '@chakra-ui/react'
import { AuthContext } from '../../contexts/Auth'
import { useHistory } from 'react-router'
import { Search2Icon } from '@chakra-ui/icons'
import SearchInputModal from './SearchInputModal'

const UnderControlBar: FC = () => {
    const disclosure = useDisclosure()
    const { currentUser } = useContext(AuthContext)
    const history = useHistory()
    return (
        <Flex display={['block', 'none']} h={20} p={4} position={'fixed'} bg={'gray.100'} borderRadius={'20px 20px 0 0'} boxShadow={'dark-lg'} zIndex={10} bottom={0} left={0} right={0}>
            <Flex justify={'space-around'}>
                <Tooltip hasArrow label={'検索'} bg={'black'} color={'white'}>
                    <Search2Icon mx={'auto'} borderRadius={'full'} bg={'white'} display={'block'} p={4} w={12} h={12} _hover={{ color: 'gray.500' }} onClick={disclosure.onOpen}/>
                </Tooltip>
                <Tooltip hasArrow label={'マイページ'} bg={'black'} color={'white'}>
                    <Avatar
                        display={'block'}
                        mx={'auto'}
                        size={'md'}
                        name={currentUser ? currentUser.username : ''}
                        src={currentUser ? currentUser.icon! : ''}
                        onClick={() => currentUser ? history.push('/user/' + currentUser.id) : history.push('/')}
                        _hover={{ opacity: 0.8 }}
                        cursor={'pointer'}
                    />
                </Tooltip>
                <Tooltip hasArrow label={'質問'} bg={'black'} color={'white'}>
                    <Avatar
                        display={'block'}
                        mx={'auto'}
                        size={'md'}
                        name={'Question'}
                        onClick={() => history.push('/question')}
                        _hover={{ opacity: 0.8 }}
                        cursor={'pointer'}
                        bg={'blue.500'}
                    />
                </Tooltip>
            </Flex>
            <SearchInputModal disclosure={disclosure} />
        </Flex>
    )
}

export default UnderControlBar;