import { FC, useEffect } from 'react'
import { Box } from '@chakra-ui/react'
import { useHistory } from 'react-router'
import { useLazyQuery } from '@apollo/client'
import { SEARCH_KEYWORD } from '../../types/gqls'
import Loading from '../../components/templates/Loading'

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

    if (loading) {
        return <Loading />
    }

    if (error) {
        return <>...error</>
    }

    return (
        <Box>
            {
                data &&
                    <>{data}</>
            }
        </Box>
    )
}

export default SearchIndex;