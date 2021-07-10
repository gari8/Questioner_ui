import { FC, useEffect, useState } from 'react'
import { Box, Heading, SimpleGrid } from '@chakra-ui/react'
import QuestionCard from '../../components/molecules/QuestionCard'
import { useLazyQuery } from '@apollo/client'
import { GET_QUESTIONS } from '../../types/gqls'
import { Question } from '../../generated/graphql'
import Loading from '../../components/templates/Loading'
import PaginationBar from '../../components/molecules/PaginationBar'

const QuestionIndex: FC = () => {
    const [config, setConfig] = useState({ limit: 12, offset: 0 })
    const [getQuestion, { loading, error, data }] = useLazyQuery(GET_QUESTIONS, {
        variables: config,
    })

    useEffect(() => {
        let isMounted = true;
        if (isMounted) {
            getQuestion({ variables: config })
        }
        return () => {
            isMounted = false;
        };
    }, [config, getQuestion])

    if (loading || !data) {
        return <Loading />
    }

    if (error) {
        return <>{error}</>
    }

    const handleNextPage = async () => {
        if (!data || data.questions.length === 0) return
        const _config = config
        if (data.questions.length >= 12) {
            _config.offset += 12
        }
        setConfig(_config)
        getQuestion({ variables: { limit: _config.limit, offset: _config.offset } })
    }

    const handlePrevPage = async () => {
        const _config = config
        if (config.offset === 0) {
            _config.offset = 0
        } else {
            _config.offset -= 12
        }
        setConfig(_config)
        getQuestion({ variables: { limit: _config.limit, offset: _config.offset } })
    }

    return (
        <Box
            p={4}
        >
            <Heading
                as={'h2'}
                size={'md'}
            >
                公開中の質問
            </Heading>
            <SimpleGrid
                columns={[2, 2, 3, 4]} spacing={2}
            >
                {
                    data.questions &&
                    data.questions.questions.map((data: Question, index: number) => {
                        return <QuestionCard key={index} data={data} />
                    })
                }
            </SimpleGrid>
            {
                data.questions && data.questions.questions.length !== 0 &&
                <PaginationBar config={config} handlePrev={handlePrevPage} handleNext={handleNextPage} length={data.questions.length} />
            }
        </Box>
    )
}

export default QuestionIndex