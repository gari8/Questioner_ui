import React, { FC, ReactNode } from 'react'
import Header from '../organisms/Header'
import { Box, Flex } from '@chakra-ui/react'
import Footer from '../organisms/Footer'
import Sidebar from '../organisms/Sidebar'

interface Props {
    children?: ReactNode
}

const MainFrame: FC<Props> = ({ children }) => {
    return (
        <Box
            position={'relative'}
            pb={20}
            minHeight={'100vh'}
            w={'full'}
            overflow={'hidden'}
        >
            <Header />
            <Flex
                w={'full'}
            >
                <Sidebar />
                <Box
                    w={'full'}
                >
                    {children}
                </Box>
            </Flex>
            <Footer />
        </Box>
    )
}

export default MainFrame