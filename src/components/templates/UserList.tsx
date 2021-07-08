import { FC, useState } from 'react'
import { User } from '../../generated/graphql'
import { PaginateConfigInterface } from '../../types'
import PaginationBar from '../molecules/PaginationBar'
import Loading from './Loading'
import { useQuery } from '@apollo/client'
import { GET_USERS } from '../../types/gqls'
import UserCard from '../molecules/UserCard'
import { Flex } from '@chakra-ui/react'

const UserList: FC = () => {
    const initConfig = { limit: 4, offset: 0 }
    const [config, setConfig] = useState<PaginateConfigInterface>(initConfig)
    const { loading, error, data, refetch } = useQuery(GET_USERS, {
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
                    data.users &&
                    data.users.users.map((user: User, index: number) => {
                        return <UserCard user={user} key={user.id + index.toString()} />
                    })
                }
            </Flex>
            {
                data.users &&
                data.users.users.length !== 0 &&
                <PaginationBar config={config} handlePrev={handlePrevPage} handleNext={() => handleNextPage(data.users.length)} length={data.users.length} />
            }
        </>
    )
}

export default UserList