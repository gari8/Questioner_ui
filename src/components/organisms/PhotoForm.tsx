import { FC } from 'react'
import { Question } from '../../generated/graphql'
import BalloonModal from '../molecules/BalloonModal'
import { Box, Text } from '@chakra-ui/react'

interface Props {
    question: Question
    handleSubmit: () => void
    answered: boolean
    isLogin: boolean
}

const PhotoForm: FC<Props> = ({ question, handleSubmit, answered, isLogin }) => {
    return (
        <>
            <BalloonModal title={"回答欄"} onSend={handleSubmit} answered={answered} isLogin={isLogin}>
                <label htmlFor={"upload"}>
                    <Box width={'full'} py={10} px={2} border={"dotted 2px gray"} borderRadius={"5px"}>
                        <Text>ドラッグ＆ドロップで画像をアップロード</Text>
                        <input
                            id={"upload"}
                            type={'file'}
                            style={{ display: 'none' }}
                            accept={"image/*"}
                        />
                    </Box>
                </label>
            </BalloonModal>
        </>
    )
}

export default PhotoForm;