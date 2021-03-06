import React, { FC } from 'react'
import Header from '../organisms/Header'
import { Box, Flex } from '@chakra-ui/react'
import Footer from '../organisms/Footer'
import Sidebar from '../organisms/Sidebar'
import UnderControlBar from '../organisms/UnderControlBar'


const MainFrame: FC = ({ children }) => {
    return (
        <Box
            position={'relative'}
            pb={[40, 20]}
            minHeight={'100vh'}
            w={'full'}
            overflow={'hidden'}
        >
            <Header />
            <Sidebar />
            <Flex
                w={'full'}
                pt={[0, 16]}
                pl={[0, 12]}
            >
                <Box
                    w={'full'}
                >
                    {children}
                </Box>
                <UnderControlBar />
            </Flex>
            <Footer />
        </Box>
    )
}

export default MainFrame