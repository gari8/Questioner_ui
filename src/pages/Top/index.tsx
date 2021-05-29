import {FC} from "react";
import {Flex, Heading} from "@chakra-ui/react";
import {testData} from "../../utilities/items";

const Top: FC = () => {
	return (
		<>
			<Heading
				as={"h2"}
				size={"md"}
			>
				公開中の質問
			</Heading>
			<Flex
				flexWrap={"wrap"}
			>
				{
					testData.map((data: any, index: number) => {
						return <p key={index}>{data.title}</p>
					})
				}
			</Flex>
		</>
	)
}

export default Top;