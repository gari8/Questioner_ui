import {FC} from "react";
import {Link} from "react-router-dom";

const Top: FC = () => {
	return (
		<>
			<Link to={"/question"}>Question</Link>
		</>
	)
}

export default Top;