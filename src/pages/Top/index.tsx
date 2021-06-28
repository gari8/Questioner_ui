import {FC} from "react";
import {Link} from "react-router-dom";
import { Text } from '@chakra-ui/react'

const Top: FC = () => {
	return (
		<>
			<Link to={"/question"}>Question</Link>
			<Text>{process.env.DEPLOY_ENV ? process.env.DEPLOY_ENV : "local"}</Text>
		</>
	)
}

export default Top;