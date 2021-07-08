import { FC } from 'react'
import { Box, Flex } from '@chakra-ui/react'

const Footer: FC = () => {
    return (
        <Flex
            as={'footer'}
            borderTop={'1px'}
            borderColor={'gray.200'}
            width={'full'}
            height={20}
            position={'absolute'}
            bottom={0}
        >
            <Box>
            </Box>
        </Flex>
    )
}

export default Footer