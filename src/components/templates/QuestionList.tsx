import { FC, useEffect, useState } from 'react'
import PaginationBar from '../molecules/PaginationBar'
import { Question } from '../../generated/graphql'
import { Box, Flex, SimpleGrid } from '@chakra-ui/react'
import { useLazyQuery } from '@apollo/client'
import { GET_QUESTIONS } from '../../types/gqls'
import { PaginateConfigInterface } from '../../types'
import Loading from './Loading'
import Error from './Error'
import QuestionCard from '../molecules/QuestionCard'

const QuestionList: FC = () => {
    const initConfig = { limit: 12, offset: 0 }
    const [config, setConfig] = useState<PaginateConfigInterface>(initConfig)
    const [getQuestions, { loading, error, data }] = useLazyQuery(GET_QUESTIONS, {
        variables: config,
    })

    useEffect(() => {
        let isMounted = true;
        if (isMounted) {
            getQuestions({ variables: config })
        }
        return () => {
            isMounted = false;
        };
    }, [config, getQuestions])

    const handleNextPage = async (length: number) => {
        const currentLength = config.offset + config.limit
        if (length - currentLength === 0) return
        const _config = config
        _config.offset += _config.limit
        setConfig(_config)
        getQuestions({ variables: _config })
    }

    const handlePrevPage = async () => {
        const _config = config
        if (_config.offset === 0) {
            _config.offset = 0
        } else {
            _config.offset -= _config.limit
        }
        setConfig(_config)
        getQuestions({ variables: _config })
    }

    if (loading) return <Loading />

    if (error) return <Error />

    return data ? (
        <>
            <Flex px={[0, 4]} flexDirection={['column-reverse', 'column-reverse', 'row']}>
                <Box w={['100%', '100%', '90%']}>
                    <SimpleGrid columns={1} spacing={[0, 2]}>
                        {
                            data.questions.questions &&
                            data.questions.questions.map((q: Question, index: number) => {
                                return <QuestionCard question={q} key={q.id + index.toString()} />
                            })
                        }
                    </SimpleGrid>
                    {
                        data.questions &&
                        data.questions.questions.length !== 0 &&
                        <PaginationBar config={config} handlePrev={handlePrevPage} handleNext={() => handleNextPage(data.questions.length)} length={data.questions.length} />
                    }
                </Box>
                <Box w={['100%', '100%', '60%']} mx={'auto'} mb={6}>
                    <Box w={['100%', '90%']} mx={'auto'} my={4} p={4} borderRadius={'md'} boxShadow={'sm'} bg={'gray.50'}>
                        aaaaaaa
                    </Box>
                </Box>
            </Flex>
        </>
    ) : <></>
}

export default QuestionList;