import React, { FC, useContext } from 'react'
import { Avatar, Flex, Spacer, Tooltip } from '@chakra-ui/react'
import { AuthContext } from '../../contexts/Auth'
import { useHistory } from 'react-router'

const UnderControlBar: FC = () => {
    const { currentUser } = useContext(AuthContext)
    const history = useHistory()
    return (
        <Flex display={['block', 'none']} h={20} p={4} position={'fixed'} bg={'gray.100'} borderRadius={'20px 20px 0 0'} boxShadow={'dark-lg'} zIndex={10} bottom={0} left={0} right={0}>
            <Flex justify={'space-around'}>
                <Tooltip hasArrow label={'dashboard'} bg={'black'} color={'white'}>
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
                <Tooltip hasArrow label={'question'} bg={'black'} color={'white'}>
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
        </Flex>
    )
}

export default UnderControlBar;