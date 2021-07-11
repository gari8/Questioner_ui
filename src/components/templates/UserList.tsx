import { FC, useEffect, useState } from 'react'
import { User } from '../../generated/graphql'
import { PaginateConfigInterface } from '../../types'
import PaginationBar from '../molecules/PaginationBar'
import Loading from './Loading'
import { useLazyQuery } from '@apollo/client'
import { GET_USERS } from '../../types/gqls'
import { SimpleGrid } from '@chakra-ui/react'
import Error from './Error'
import MiniUserCard from '../molecules/MiniUserCard'

const UserList: FC = () => {
    const initConfig = { limit: 12, offset: 0 }
    const [config, setConfig] = useState<PaginateConfigInterface>(initConfig)
    const [getUsers, { loading, error, data }] = useLazyQuery(GET_USERS, {
        variables: config,
    })

    useEffect(() => {
        let isMounted = true;
        if (isMounted) {
            getUsers({ variables: config })
        }
        return () => {
            isMounted = false;
        };
    }, [config, getUsers])

    const handleNextPage = async (length: number) => {
        const currentLength = config.offset + config.limit
        if (length - currentLength === 0) return
        const _config = config
        _config.offset += _config.limit
        setConfig(_config)
        getUsers({ variables: _config })
    }

    const handlePrevPage = async () => {
        const _config = config
        if (_config.offset === 0) {
            _config.offset = 0
        } else {
            _config.offset -= _config.limit
        }
        setConfig(_config)
        getUsers({ variables: _config })
    }

    if (loading) return <Loading />

    if (error) return <Error />


    return data ? (
        <>
            <SimpleGrid columns={[1, 1, 2]} spacing={[0, 2]}>
                {
                    data.users &&
                    data.users.users.map((user: User, index: number) => {
                        return <MiniUserCard user={user} key={user.id + index.toString()} />
                    })
                }
            </SimpleGrid>
            {
                data.users &&
                data.users.users.length !== 0 &&
                <PaginationBar config={config} handlePrev={handlePrevPage} handleNext={() => handleNextPage(data.users.length)} length={data.users.length} />
            }
        </>
    ) : <></>
}

export default UserList