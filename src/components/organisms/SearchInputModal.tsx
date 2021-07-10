import React, { FC } from 'react'
import {
    Box,
    Flex,
    Input,
    Modal, ModalBody,
    ModalContent,
    Text,
    ModalOverlay, Switch, InputLeftElement, InputGroup,
} from '@chakra-ui/react'
import { DisclosureInterface } from '../../types'
import { SearchIcon } from '@chakra-ui/icons'

interface Props {
    disclosure: DisclosureInterface
}

const SearchInputModal: FC<Props> = ({ disclosure }) => {

    return (
        <Modal scrollBehavior={'outside'} isOpen={disclosure.isOpen} onClose={disclosure.onClose} size={'3xl'}>
            <ModalOverlay />
            <ModalContent mx={[4, 'auto']} pb={4}>
                <ModalBody>
                    <InputGroup mb={8} mt={4} size={'lg'} color={'gray.500'}>
                        <InputLeftElement
                            pointerEvents="none"
                            children={<SearchIcon color="gray.300" />}
                        />
                        <Input type="text" placeholder="検索 キーワード" />
                    </InputGroup>
                    <Flex>
                        <Box w={'70%'}>
                            {

                            }
                        </Box>
                        <Box border={'1px solid'} borderColor={'gray.200'} borderRadius={'md'} w={'30%'} p={4} position={'sticky'}>
                            <Text fontSize={'sm'} color={'gray.500'}>ユーザー</Text>
                            <Switch ml={'20%'} my={2} size='md' defaultChecked={true} />
                            <Text fontSize={'sm'} color={'gray.500'}>質問</Text>
                            <Switch ml={'20%'} my={2} size='md' defaultChecked={true} />
                        </Box>
                    </Flex>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

export default SearchInputModal;