import React, { FC, useContext } from 'react'
import { Avatar, Flex, IconButton, useDisclosure } from '@chakra-ui/react'
import { AuthContext } from '../../contexts/Auth'
import { useHistory } from 'react-router'
import { Search2Icon } from '@chakra-ui/icons'
import SearchInputModal from './SearchInputModal'
import { ImHome3 } from 'react-icons/im'

const UnderControlBar: FC = () => {
    const disclosure = useDisclosure()
    const { currentUser } = useContext(AuthContext)
    const history = useHistory()
    return (
        <Flex display={['block', 'none']} h={20} p={4} position={'fixed'} bg={'gray.100'} borderRadius={'20px 20px 0 0'} boxShadow={'dark-lg'} zIndex={10} bottom={0} left={0} right={0}>
            <Flex justify={'space-around'}>
                <Search2Icon mx={'auto'} borderRadius={'full'} bg={'white'} display={'block'} p={4} w={12} h={12} _hover={{ color: 'gray.500' }} onClick={disclosure.onOpen}/>
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
                <IconButton
                    icon={<ImHome3 />} mx={'auto'} display={'block'} p={4} w={12} h={12} borderRadius={'full'} aria-label={'top'} bg={'white'} _focus={{ outline: 0 }}
                    _hover={{ color: 'gray.500' }} onClick={() => history.push('/')}
                />
            </Flex>
            <SearchInputModal disclosure={disclosure} />
        </Flex>
    )
}

export default UnderControlBar;