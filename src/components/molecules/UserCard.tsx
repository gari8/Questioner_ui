import { FC } from 'react'
import { User } from '../../generated/graphql'
import { Box } from '@chakra-ui/react'

interface Props {
    user: User
}

const UserCard: FC<Props> = ({ user }) => {
    return (
        <Box>

        </Box>
    )
}

export default UserCard;