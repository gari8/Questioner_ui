import { FC } from 'react'
import { Flex, IconButton, Text } from '@chakra-ui/react'
import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons'
import { PaginateConfigInterface } from '../../types'

interface Props {
    handlePrev: () => void
    handleNext: () => void
    length: number
    config: PaginateConfigInterface
}

const PaginationBar: FC<Props> = ({ handleNext, handlePrev, config, length }) => {
    const currentLength = config.offset + config.limit
    const pageNum = (config.offset + config.limit) / config.limit
    return (
        <Flex justify={'center'} my={4}>
            <IconButton disabled={pageNum === 1} aria-label={'Prev'} _focus={{ outline: 'none' }} onClick={handlePrev}
                        icon={<ArrowLeftIcon />} />
            <Flex flexDirection={'column'} px={3} mx={1} justify={'center'} borderRadius={'md'} bg={'gray.100'}>
                <Text fontSize={18} fontWeight={'black'}>{pageNum}</Text>
            </Flex>
            <IconButton disabled={length - currentLength <= 0} aria-label={'Next'} _focus={{ outline: 'none' }} onClick={handleNext}
                        icon={<ArrowRightIcon />} />
        </Flex>
    )
}

export default PaginationBar