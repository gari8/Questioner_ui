import { FC } from 'react'
import { Question } from '../../generated/graphql'
import { Textarea } from '@chakra-ui/react'
import BalloonModal from '../molecules/BalloonModal'

interface Props {
    question: Question
    handleSubmit: () => void
    answered: boolean
    isLogin: boolean
}

const FreeForm: FC<Props> = ({ question, handleSubmit, answered, isLogin }) => {
    return (
        <>
            <BalloonModal title={"回答欄"} onSend={handleSubmit} answered={answered} isLogin={isLogin}>
                <Textarea w={"100%"} h={100} bg={'white'}/>
            </BalloonModal>
        </>
    )
}

export default FreeForm