import {FC} from "react";
import {Link} from "react-router-dom";
import { Text } from '@chakra-ui/react'

const Top: FC = () => {
	return (
		<>
			<Link to={"/question"}>Question</Link>
			<Text>{process.env.VERCEL_ENV ? process.env.VERCEL_ENV : "local"}</Text>
		</>
	)
}

export default Top;