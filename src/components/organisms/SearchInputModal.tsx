import React, { FC, useState } from 'react'
import {
    Input,
    Modal, ModalBody,
    ModalContent,
    ModalOverlay, InputLeftElement, InputGroup,
} from '@chakra-ui/react'
import { DisclosureInterface } from '../../types'
import { SearchIcon } from '@chakra-ui/icons'
import { useHistory } from 'react-router'

interface Props {
    disclosure: DisclosureInterface
}

const SearchInputModal: FC<Props> = ({ disclosure }) => {
    const [keyword, setKeyword] = useState("")
    const history = useHistory()

    return (
        <Modal scrollBehavior={'outside'} isOpen={disclosure.isOpen} onClose={disclosure.onClose} size={'3xl'}>
            <ModalOverlay />
            <ModalContent mx={[4, 'auto']}>
                <ModalBody>
                    <InputGroup my={4} size={'lg'} color={'gray.500'}>
                        <InputLeftElement
                            pointerEvents="none"
                            children={<SearchIcon color="gray.300" />}
                        />
                        <Input
                            type="text" placeholder="検索 キーワード"
                            onChange={e => {
                                setKeyword(e.target.value)
                            }}
                            onKeyPress={e => {
                                if (e.key === 'Enter') {
                                    e.preventDefault()
                                    if (keyword === "") return
                                    history.push("/search?keyword="+keyword)
                                    disclosure.onClose()
                                }
                            }}
                        />
                    </InputGroup>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

export default SearchInputModal;