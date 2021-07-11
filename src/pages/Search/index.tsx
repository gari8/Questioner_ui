import { FC, useEffect } from 'react'
import { Box, Heading, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import { useHistory } from 'react-router'
import { useLazyQuery } from '@apollo/client'
import { SEARCH_KEYWORD } from '../../types/gqls'
import Loading from '../../components/templates/Loading'
import MiniQuestionCard from '../../components/molecules/MiniQuestionCard'
import { Question, User } from '../../generated/graphql'
import Error from '../../components/templates/Error'
import MiniUserCard from '../../components/molecules/MiniUserCard'

const SearchIndex: FC = () => {
    const history = useHistory()
    const keyword = history.location.search.replace('?keyword=', '')
    const [getSearchResult, { loading, error, data }] = useLazyQuery(SEARCH_KEYWORD, { variables: { keyword: keyword } })

    useEffect(() => {
        let isMounted = true;
        if (isMounted) {
            getSearchResult({ variables: { keyword: keyword } })
        }
        return () => {
            isMounted = false;
        };
    }, [keyword, getSearchResult])

    if (loading || !data) {
        return <Loading />
    }

    if (error) {
        return <Error />
    }

    console.log(data, keyword)

    return (
        <Box p={4}>
            <Heading
                as={'h2'}
                size={'md'}
            >
                {keyword}: 検索結果
            </Heading>
            <Tabs my={4}>
                <TabList>
                    <Tab _focus={{ outline: '0' }} borderRadius={'5px 5px 0 0'}>質問</Tab>
                    <Tab _focus={{ outline: '0' }} borderRadius={'5px 5px 0 0'}>アカウント</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        {
                            data.questions &&
                            data.questions.map((q: Question, index: number) => {
                                return <MiniQuestionCard question={data.q} key={q.id+index.toString()}/>
                            })
                        }
                    </TabPanel>
                    <TabPanel>
                        {
                            data.users &&
                            data.users.map((u: User, index: number) => {
                                return <MiniUserCard user={u} key={u.id+index.toString()} />
                            })
                        }
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Box>
    )
}

export default SearchIndex;