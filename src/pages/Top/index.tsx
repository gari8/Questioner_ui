import { FC } from 'react'
import QuestionList from 'components/templates/QuestionList'
import UserList from 'components/templates/UserList'
import { Heading, Box, TabList, Tab, TabPanels, TabPanel, Tabs } from '@chakra-ui/react'

const Top: FC = () => {
    return (
        <Box p={[0, 4]}>
            <Tabs>
                <TabList>
                    <Tab _focus={{ outline: '0' }} borderRadius={'5px 5px 0 0'}>質問</Tab>
                    <Tab _focus={{ outline: '0' }} borderRadius={'5px 5px 0 0'}>アカウント</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel px={[0, 2]}>
                        <Heading
                            as={'h2'}
                            size={'md'}
                            p={2}
                        >
                            新着質問
                        </Heading>
                        <QuestionList />
                    </TabPanel>
                    <TabPanel px={[0, 2]}>
                        <Heading
                            as={'h2'}
                            size={'md'}
                            p={2}
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