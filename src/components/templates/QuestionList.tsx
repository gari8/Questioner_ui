import { FC, useState } from 'react'
import PaginationBar from '../molecules/PaginationBar'
import { Question } from '../../generated/graphql'
import QuestionCard from '../molecules/QuestionCard'
import { Flex } from '@chakra-ui/react'
import { useQuery } from '@apollo/client'
import { GET_QUESTIONS } from '../../types/gqls'
import { PaginateConfigInterface } from '../../types'
import Loading from './Loading'

const QuestionList: FC = () => {
    const initConfig = { limit: 4, offset: 0 }
    const [config, setConfig] = useState<PaginateConfigInterface>(initConfig)
    const { loading, error, data, refetch } = useQuery(GET_QUESTIONS, {
        variables: config,
    })


    const handleNextPage = async (length: number) => {
        const currentLength = config.offset + config.limit
        if (length - currentLength === 0) return
        const _config = config
        _config.offset += _config.limit
        setConfig(_config)
        refetch(_config)
    }

    const handlePrevPage = async () => {
        const _config = config
        if (_config.offset === 0) {
            _config.offset = 0
        } else {
            _config.offset -= _config.limit
        }
        setConfig(_config)
        refetch(_config)
    }

    if (loading) return <Loading />

    if (error) return <>...error</>

    return (
        <>
            <Flex wrap={'wrap'} justify={'center'}>
                {
                    data.questions.questions &&
                    data.questions.questions.map((q: Question, index: number) => {
                        return <QuestionCard data={q} key={q.id + index.toString()} />
                    })
                }
            </Flex>
            {
                data.questions &&
                data.questions.questions.length !== 0 &&
                <PaginationBar config={config} handlePrev={handlePrevPage} handleNext={() => handleNextPage(data.questions.length)} length={data.questions.length} />
            }
        </>
    )
}

export default QuestionList;