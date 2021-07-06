import { FC } from 'react'
import { Box } from '@chakra-ui/react'

const Layer: FC = ({ children }) => {
    return (
        <Box
            position={'fixed'}
            top={0}
            bottom={0}
            left={0}
            right={0}
            w={'full'}
            h={'100vh'}
            bg={'rgba(256, 256, 256, 0.8)'}
            zIndex={100}
        >
            { children }
        </Box>
    )
}

export default Layer;