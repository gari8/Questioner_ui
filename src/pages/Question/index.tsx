import { FC, useState } from 'react'
import { Box, Flex, Heading} from '@chakra-ui/react'
import QuestionCard from '../../components/molecules/QuestionCard'
import { useQuery } from '@apollo/client'
import { GET_QUESTIONS } from '../../types/gqls'
import { Question } from '../../generated/graphql'
import Loading from '../../components/templates/Loading'
import PaginationBar from '../../components/molecules/PaginationBar'

const QuestionIndex: FC = () => {
    const [config, setConfig] = useState({ limit: 12, offset: 0 })
    const { loading, error, data, refetch } = useQuery(GET_QUESTIONS, {
        variables: config,
    })

    if (loading) {
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
        refetch({ limit: _config.limit, offset: _config.offset })
    }

    const handlePrevPage = async () => {
        const _config = config
        if (config.offset === 0) {
            _config.offset = 0
        } else {
            _config.offset -= 12
        }
        setConfig(_config)
        refetch({ limit: _config.limit, offset: _config.offset })
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
            <Flex
                flexWrap={'wrap'}
                justify={'left'}
            >
                {
                    data.questions &&
                    data.questions.questions.map((data: Question, index: number) => {
                        return <QuestionCard key={index} data={data} />
                    })
                }
            </Flex>
            {
                data.questions && data.questions.questions.length !== 0 &&
                <PaginationBar config={config} handlePrev={handlePrevPage} handleNext={handleNextPage} length={data.questions.length} />
            }
        </Box>
    )
}

export default QuestionIndex