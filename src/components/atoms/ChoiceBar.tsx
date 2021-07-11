import { FC } from 'react'
import { Flex, IconButton, Text } from '@chakra-ui/react'
import { Choice } from '../../generated/graphql'
import { DeleteIcon } from '@chakra-ui/icons'

interface Props {
    choice: Choice
    update: () => void
}

const ChoiceBar: FC<Props> = ({ choice, update }) => {
    return (
        <Flex justify={'space-between'} borderRadius={'md'} my={2} py={2} px={4} bg={'gray.50'} _hover={{ bg: 'gray.200' }}>
            <Flex flexDirection={'column'} justify={'center'}>
                <Text>{choice.content}</Text>
            </Flex>
            <IconButton
                bg={'red.400'}
                color={'white'}
                size={'sm'}
                aria-label={'delete choice'}
                icon={<DeleteIcon />}
                _focus={{ outline: 0 }}
                _hover={{ bg: 'red.600' }}
                onClick={() => {
                    update()
                }}
            />
        </Flex>
    )
}

export default ChoiceBar;