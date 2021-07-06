import { FC, useState } from 'react'
import {Link} from "react-router-dom";
import { Text } from '@chakra-ui/react'
import { useQuery } from '@apollo/client'
import { DRAW_TOP } from '../../types/gqls'
import Loading from '../../components/templates/Loading'
import { User } from '../../generated/graphql'

const Top: FC = () => {
	const initConfig = {limit: 12, offset: 0}
	const [userConfig, setUserConfig] = useState(initConfig)
	const [questionConfig, setQuestionConfig] = useState(initConfig)
	const payload = { uLimit: userConfig.limit, uOffset: userConfig.offset, qLimit: questionConfig.limit, qOffset: questionConfig.offset }
	const { loading, error, data, refetch } = useQuery(DRAW_TOP, {
		variables: payload
	})

	if (loading) return <Loading />

	if (error) return <>...error</>

	return (
		<>
			<Link to={"/question"}>Question</Link>
			<Text>{data
				?
				data.users.map((u: User, index: number) => {
					return <Text key={index}>{u.username}</Text>
				})
				:
				"local"}</Text>
		</>
	)
}

export default Top;