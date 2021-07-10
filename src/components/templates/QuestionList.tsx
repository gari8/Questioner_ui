import { FC, useEffect, useState } from 'react'
import PaginationBar from '../molecules/PaginationBar'
import { Question } from '../../generated/graphql'
import QuestionCard from '../molecules/QuestionCard'
import { SimpleGrid } from '@chakra-ui/react'
import { useLazyQuery } from '@apollo/client'
import { GET_QUESTIONS } from '../../types/gqls'
import { PaginateConfigInterface } from '../../types'
import Loading from './Loading'

const QuestionList: FC = () => {
    const initConfig = { limit: 4, offset: 0 }
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

    if (loading || !data) return <Loading />

    if (error) return <>...error</>

    return (
        <>
            <SimpleGrid columns={[2, 2, 3, 4]} spacing={[0, 2]}>
                {
                    data.questions.questions &&
                    data.questions.questions.map((q: Question, index: number) => {
                        return <QuestionCard data={q} key={q.id + index.toString()} />
                    })
                }
            </SimpleGrid>
            {
                data.questions &&
                data.questions.questions.length !== 0 &&
                <PaginationBar config={config} handlePrev={handlePrevPage} handleNext={() => handleNextPage(data.questions.length)} length={data.questions.length} />
            }
        </>
    )
}

export default QuestionList;