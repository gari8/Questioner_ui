import React, {FC} from "react";
import {Avatar, CloseButton, Flex, Input, Text} from "@chakra-ui/react";

interface Props {
	blobURL: string
	setBlobURL: React.Dispatch<React.SetStateAction<string>>
	src: string
	alt?: string
	hideText?: boolean
}

const UploadImg: FC<Props> = ({ blobURL, setBlobURL, src, alt = '', hideText = false }) => {
	const createBlob = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!e.target.files) return;
		const file = e.target.files[0]
		if (file) {
			setBlobURL(window.URL.createObjectURL(file))
		}
	}

	return (
		<Flex>
			<label htmlFor={"icon-upload"}>
				{
					blobURL === '' ?
						<Avatar name={alt} size={"lg"} src={src} m={2} />
						:
						<Avatar name={alt} size={"lg"} src={blobURL} m={2} bg={'whiteAlpha.50'}/>
				}
				<Input type={"file"} display={"none"} id={"icon-upload"} onChange={createBlob} />
			</label>
			<Flex flexDirection={"column"} justify={"space-between"}>
				{
					blobURL === '' ?
						<Text> </Text>
						:
						<CloseButton _active={{ outline: "none" }} size={"sm"} onClick={() => setBlobURL('')}/>
				}
				{
					!hideText &&
                    <Text mx={2} fontSize={"xs"} color={'red'}>画像をクリックして編集</Text>
				}
			</Flex>
		</Flex>
	)
}

export default UploadImg;