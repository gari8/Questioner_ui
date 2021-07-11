import React, { FC, useContext, useState } from 'react'
import {
    Flex, IconButton,
    Menu, MenuButton,
    MenuItem,
    MenuList,
    Spacer, useDisclosure,
    Icon, Avatar, Text,
} from '@chakra-ui/react'
import {
    AddIcon, AtSignIcon,
    HamburgerIcon,
} from '@chakra-ui/icons'
import ModalWrapper from './ModalWrapper'
import { HiLogout, HiLogin, HiUserAdd } from 'react-icons/hi'
import { FaKey } from 'react-icons/fa'
import { ModalType } from '../../utilities/items'
import { useHistory } from 'react-router'
import { AuthContext } from '../../contexts/Auth'

const Header: FC = () => {
    const disclosure = useDisclosure()
    const history = useHistory()
    const user = useContext(AuthContext)
    const currentUser = user.currentUser
    // switch modalType
    const [modalType, setModalType] = useState<ModalType>(ModalType.Profile)
    return (
        <Flex
            as={'header'}
            width={'full'}
            shadow={'sm'}
            position={['static', 'fixed']}
            zIndex={10}
            bg={'white'}
            py={2}
            px={2}
        >
            <Flex
                onClick={() => history.push('/')}
                cursor={'pointer'}
            >
                <Avatar name={'F'} size={'md'} fontWeight={'black'} bg={'black'} />
                <Flex flexDirection={'column'} justify={'flex-end'}>
                    <Text fontWeight={'black'}>avs4</Text>
                </Flex>
            </Flex>
            <Spacer />
            <Menu>
                <Flex flexDirection={'column'} justify={'center'}>
                    <MenuButton
                        mx={2}
                        as={IconButton}
                        aria-label='Options'
                        icon={<HamburgerIcon />}
                        variant='outline'
                        _focus={{ outline: 0 }}
                    />
                </Flex>
                {
                    currentUser ?
                        <MenuList>
                            <MenuItem
                                _focus={{ outline: 0 }}
                                icon={<AddIcon />}
                                onClick={() => {
                                    setModalType(ModalType.NewQuestion)
                                    disclosure.onOpen()
                                }}
                            >
                                質問の作成
                            </MenuItem>
                            <MenuItem
                                _focus={{ outline: 0 }}
                                icon={<AtSignIcon />}
                                onClick={() => {
                                    setModalType(ModalType.Profile)
                                    disclosure.onOpen()
                                }}
                            >
                                プロフィール編集
                            </MenuItem>
                            <MenuItem
                                _focus={{ outline: 0 }}
                                icon={<FaKey />}
                                onClick={() => {
                                    setModalType(ModalType.EditPassword)
                                    disclosure.onOpen()
                                }}
                            >
                                パスワード編集
                            </MenuItem>
                            <MenuItem
                                _focus={{ outline: 0 }}
                                icon={<Icon as={HiLogout} />}
                                onClick={() => {
                                    setModalType(ModalType.Logout)
                                    disclosure.onOpen()
                                }}
                            >
                                ログアウト
                            </MenuItem>
                        </MenuList> :
                        <MenuList>
                            <MenuItem
                                _focus={{ outline: 0 }}
                                icon={<Icon as={HiLogin} />}
                                onClick={() => {
                                    setModalType(ModalType.Login)
                                    disclosure.onOpen()
                                }}
                            >
                                ログイン
                            </MenuItem>
                            <MenuItem
                                _focus={{ outline: 0 }}
                                icon={<Icon as={HiUserAdd} />}
                                onClick={() => {
                                    setModalType(ModalType.Signup)
                                    disclosure.onOpen()
                                }}
                            >
                                サインアップ
                            </MenuItem>
                        </MenuList>
                }
            </Menu>
            <ModalWrapper modalType={modalType} disclosure={disclosure} />
        </Flex>
    )
}

export default Header