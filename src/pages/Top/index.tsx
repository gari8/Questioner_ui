import { FC } from 'react'
import QuestionList from 'components/templates/QuestionList'
import UserList from 'components/templates/UserList'
import { Heading, Box, TabList, Tab, TabPanels, TabPanel, Tabs } from '@chakra-ui/react'

const Top: FC = () => {
    return (
        <Box p={4}>
            <Tabs>
                <TabList>
                    <Tab _focus={{ outline: '0' }} borderRadius={'5px 5px 0 0'}>質問</Tab>
                    <Tab _focus={{ outline: '0' }} borderRadius={'5px 5px 0 0'}>アカウント</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <Heading
                            as={'h2'}
                            size={'md'}
                        >
                            新着質問
                        </Heading>
                        <QuestionList />
                    </TabPanel>
                    <TabPanel>
                        <Heading
                            as={'h2'}
                            size={'md'}
                        >
                            最新アカウント
                        </Heading>
                        <UserList />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Box>
    )
}

export default Top