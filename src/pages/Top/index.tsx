import { FC } from 'react'
import QuestionList from 'components/templates/QuestionList'
import UserList from 'components/templates/UserList'
import { Heading, Box } from '@chakra-ui/react'

const Top: FC = () => {
    return (
        <Box p={4}>
            <Heading
                as={'h2'}
                size={'md'}
            >
                新着質問
            </Heading>
            <QuestionList />
            <Heading
                as={'h2'}
                size={'md'}
            >
                最新ユーザー
            </Heading>
            <UserList />
        </Box>
    )
}

export default Top